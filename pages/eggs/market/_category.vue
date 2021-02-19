<template>
    <el-col style="padding-top: 30px; padding-left: 10px" :md="{ span: 22 }">
        <el-row>
            <el-col :sm="24" :md="3">
                <el-button
                    style="width: 100%"
                    type="primary"
                    @click="dialogCategoryFormVisible = true"
                    :disabled="error === null ? false : true"
                    >Déposer une annonce</el-button
                >
                <br />
                <br />

                <el-input v-model="search" placeholder="Rechercher un prêt" />
                <br />
                <br />
                <div>
                    <nuxt-link
                        class="nav-market-category"
                        :class="{
                            active:
                                $nuxt.$route.path ===
                                `/eggs/market/${$auth.user.id}`,
                        }"
                        :to="{
                            name: 'eggs-market-category',
                            params: { category: $auth.user.id },
                            query: search ? { q: search } : {},
                        }"
                    >
                        Mes annonces
                    </nuxt-link>
                    <nuxt-link
                        class="nav-market-category"
                        :class="{
                            active: $nuxt.$route.path === '/eggs/market',
                        }"
                        :to="{
                            name: 'eggs-market-category',
                            params: {},
                            query: search ? { q: search } : {},
                        }"
                    >
                        Toutes catégories
                    </nuxt-link>
                    <nuxt-link
                        class="nav-market-category"
                        :class="{
                            active: $nuxt.$route.path.startsWith(
                                `/eggs/market/${category.value.toLowerCase()}`
                            ),
                        }"
                        :to="{
                            name: 'eggs-market-category',
                            params: { category: category.value.toLowerCase() },
                            query: search ? { q: search } : {},
                        }"
                        v-for="category in categories"
                        :key="category.value"
                    >
                        {{ category.value.toLowerCase() }}
                    </nuxt-link>
                </div>
            </el-col>

            <el-col :sm="24" :md="{ span: 20, offset: 1 }">
                <el-alert
                    v-if="$auth.user.level === 2"
                    :closable="false"
                    title="N'oublie pas de déposer une annonce"
                    type="warning"
                    description="Aide nous à construire ce marché de la location gratuite en mettant à ton tour un objet ou un service à la disposition de tous, merci!"
                    show-icon
                >
                </el-alert>
                <div
                    v-if="filteredAds.length === 0 && !$apollo.loading"
                    style="text-align: center; padding: 10px"
                >
                    <br />
                    <strong
                        >Désolé, aucune annonce ne correspond à tes
                        filtres</strong
                    >
                    <cld-image
                        public-id="/H2T/main/undraw_not_found_60pq_qtnyav.svg"
                        :width="$device.isMobile ? '100%' : '50%'"
                        fetchFormat="auto"
                        quality="auto"
                        loading="lazy"
                    />
                </div>
                <market-list
                    @refetchAds="refetchAds"
                    v-loading="$apollo.loading"
                    :ads="filteredAds"
                ></market-list>
            </el-col>
        </el-row>

        <el-dialog
            :fullscreen="$device.isMobile"
            :title="`Déposer une annonce dans ${form.categories}`"
            :visible.sync="dialogFormVisible"
        >
            <span style="word-break: keep-all">
                Merci beaucoup de ta participation! Si une personne est
                intéressée elle te contactera directement par mail ou par
                message facebook si tu as rempli ton profil✨✨
            </span>
            <el-divider></el-divider>

            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                v-loading="sendingAd"
            >
                <el-form-item label="Titre" prop="title">
                    <el-autocomplete
                        style="display: block"
                        v-if="form.categories == 'BOARDGAME'"
                        v-model="form.title"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="Catan"
                        @select="handleSelect"
                    ></el-autocomplete>
                    <el-input
                        v-else
                        placeholder="Appareil à raclette pour 6 personnes"
                        v-model="form.title"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    Photo
                    <cloudinary-uploader
                        @pictureUpdate="(picture) => (form.picture = picture)"
                        :public_id="`H2T/ads/${form.id}/image`"
                        :picture="form.picture"
                        type="picture-ad"
                    />
                </el-form-item>
                <el-form-item label="Description" prop="description">
                    <el-input
                        placeholder="Le titre est plutôt explicite ici mais tu peux par exemple rajouter que ça vient avec une rallonge si besoin"
                        style="display: inline; word-break: keep-all"
                        :autosize="{ minRows: 6 }"
                        type="textarea"
                        v-model="form.description"
                    ></el-input>
                </el-form-item>
                <el-form-item label="Code Postal" prop="zipCode">
                    <el-col :span="6">
                        <el-input
                            maxlength="6"
                            placeholder="H2T1R1"
                            v-model="form.zipCode"
                        ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="Disponible dès publication?"
                    prop="available"
                >
                    <el-switch
                        v-model="form.available"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        >>
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"
                    >Annuler</el-button
                >
                <el-button
                    type="primary"
                    @click="createAd('form')"
                    :disabled="sendingAd"
                    >Mettre ce prêt à disposition</el-button
                >
            </span>
        </el-dialog>

        <el-dialog
            :fullscreen="$device.isMobile"
            title="Dans quelle catégorie places-tu ton annonce?"
            :visible.sync="dialogCategoryFormVisible"
            width="40%"
            center
        >
            <el-form :model="form">
                <el-form-item label="Catégories">
                    <el-col :span="24">
                        <el-select
                            v-model="form.categories"
                            placeholder="Sélectionner"
                        >
                            <el-option
                                v-for="category in categories"
                                :key="category.value"
                                :label="category.value"
                                :value="category.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCategoryFormVisible = false"
                    >Annuler</el-button
                >
                <el-button
                    type="primary"
                    @click="
                        dialogFormVisible = true;
                        dialogCategoryFormVisible = false;
                    "
                    >Confirmer la catégorie</el-button
                >
            </span>
        </el-dialog>
    </el-col>
</template>

<script>
import "dayjs/locale/fr";
import gql from "graphql-tag";
import { v4 as uuidv4, validate as validateUuid } from "uuid";
import parser from "fast-xml-parser";
import _ from "lodash";

export default {
    head() {
        return {
            title: "H2T.market",
        };
    },
    auth: true,
    data() {
        return {
            search: null,
            geoJSONSearch: [47.41322, -1.219482],
            error: null,
            ads: [],
            sendingAd: false,
            lockSubmit: false,
            dialogCategoryFormVisible: false,
            dialogAdVisible: false,
            dialogFormVisible: false,
            categories: [
                { value: "DIVERS" },
                { value: "CUISINE" },
                { value: "ELECTRONIQUE" },
                { value: "LIVRE" },
                { value: "BOARDGAME" },
                { value: "MAISON" },
                { value: "SERVICE" },
                { value: "VETEMENT" },
            ].sort((a, b) => (a.value > b.value ? 1 : -1)),
            form: {
                id: this.generateUid(),
                title: "",
                description: "",
                author: this.$auth.loggedIn
                    ? this.$store.state.auth.user.id
                    : null,
                zipCode: "",
                categories: "",
                picture: "",
                additionalData: {},
                available: true,
            },
            rules: {
                title: [
                    {
                        required: true,
                        min: 3,
                        max: 80,
                        message: "Le titre doit faire entre 3 et 80 caractères",
                    },
                ],
                zipCode: [
                    {
                        required: true,
                        len: 6,
                        message: "Le code postal doit faire 6 caractères",
                    },
                ],
                categories: [
                    {
                        validator: this.validateCategory,
                        required: true,
                        message: "Veuillez sélectionner  une catégorie",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    apollo: {
        ads: {
            query: gql`
                query getAds {
                    ads(orderBy: { updatedAt: desc }) {
                        picture
                        id
                        title
                        description
                        createdAt
                        author {
                            id
                            firstName
                            picture
                            createdAt
                            email
                            facebookUrl
                        }
                        zipCode
                        categories
                        additionalData
                        available
                    }
                }
            `,
        },
    },
    methods: {
        validateCategory: function (rule, value, callback) {
            if (rule.required && this.form.categories.length === 0) {
                callback(new Error(rule.message));
            }
            callback();
        },
        generateUid() {
            return uuidv4();
        },
        async createAd(form) {
            return this.$refs[form].validate(async (valid) => {
                if (valid) {
                    this.sendingAd = true;

                    this.$apollo
                        .mutate({
                            mutation: gql`
                                mutation createAd(
                                    $id: String!
                                    $title: String!
                                    $description: String!
                                    $author: String
                                    $zipCode: String!
                                    $categories: AdCategory
                                    $picture: String
                                    $additionalData: Json
                                    $available: Boolean
                                ) {
                                    createOneAd(
                                        data: {
                                            id: $id
                                            title: $title
                                            description: $description
                                            author: { connect: { id: $author } }
                                            zipCode: $zipCode
                                            categories: $categories
                                            picture: $picture
                                            additionalData: $additionalData
                                            available: $available
                                        }
                                    ) {
                                        title
                                        picture
                                        description
                                        createdAt
                                        author {
                                            id
                                            firstName
                                            createdAt
                                            email
                                            level
                                            picture
                                        }
                                        zipCode
                                        categories
                                        additionalData
                                        available
                                    }
                                }
                            `,
                            variables: { ...this.form },
                        })
                        .then((resp) => {
                            if (this.$auth.user.level === 2) {
                                this.addUserLevel(1);
                            }
                            this.refetchAds();
                            this.$message.success("Merci encore! ✨");
                            this.dialogFormVisible = false;
                            this.$refs[form].resetFields();
                            this.form.picture = "";
                            this.form.additionalData = {};
                            this.form.id = this.generateUid();
                            this.sendingAd = false;
                        })
                        .catch((error) => {
                            this.$message.error(error);
                        });
                } else {
                    this.$message.error(
                        "Merci de corriger les champs incorrects"
                    );
                    return false;
                }
            });
        },
        async refetchAds() {
            this.$apollo.queries.ads.refetch();
        },
        async querySearchAsync(queryString, cb) {
            if (queryString.length <= 2) {
                cb([]);
                return;
            }

            // space need to be replaced by + https://boardgamegeek.com/wiki/page/BGG_XML_API2#toc3
            const sanitizedQuery = `https://api.geekdo.com/xmlapi2/search?query=${queryString.replace(
                / /g,
                "+"
            )}&type=boardgame`;
            const response = await (await fetch(sanitizedQuery)).text();
            var jsonObj = parser.parse(response, {
                ignoreAttributes: false,
            });

            if (!jsonObj?.items?.item) {
                cb([
                    {
                        value: "Aucun jeu trouvé, rentre le manuellement",
                        disabled: true,
                    },
                ]);
                return;
            }

            const arrayResult = jsonObj.items.item.length
                ? jsonObj.items.item
                : [jsonObj.items.item];

            const printedResult = arrayResult.slice(0, 10).map((item) => {
                return { value: item.name["@_value"], id: item["@_id"] };
            });
            cb(printedResult);
        },
        async handleSelect(value) {
            const response = await (
                await fetch(
                    `https://api.geekdo.com/xmlapi2/thing?id=${value.id}&stats=1`
                )
            ).text();
            var parsedResponse = parser.parse(response, {
                ignoreAttributes: false,
            });
            if (!parsedResponse.items.item) return;
            this.form.picture = parsedResponse.items.item.image;
            this.form.additionalData = {
                rating:
                    _.ceil(
                        parsedResponse.items.item.statistics.ratings.average[
                            "@_value"
                        ],
                        2
                    ) / 2,
                difficulty:
                    _.ceil(
                        parsedResponse.items.item.statistics.ratings
                            .averageweight["@_value"],
                        2
                    ) / 2,
                minPlayers: parsedResponse.items.item.minplayers?.["@_value"],
                maxPlayers: parsedResponse.items.item.maxplayers?.["@_value"],
                playingTime: parsedResponse.items.item.playingtime?.["@_value"],
            };
        },
        async addUserLevel(level) {
            return await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation addUserLevel($userId: String!, $level: Int) {
                            updateOneUser(
                                where: { id: $userId }
                                data: { level: { set: $level } }
                            ) {
                                id
                                ads {
                                    id
                                }
                            }
                        }
                    `,
                    variables: {
                        userId: this.$auth.user.id,
                        level: this.$auth.user.level + level,
                    },
                })
                .then((resp) => {
                    if (resp.errors) {
                        this.$message.error(resp.errors[0].message);
                    } else {
                        this.$auth.setUser({
                            ...this.$auth.user,
                            level: this.$auth.user.level + level,
                        });
                        this.$message.close();
                        this.$message.success(
                            `Tu as gagné une portée (${
                                this.$auth.user.level - level
                            }
              ➡️ ${this.$auth.user.level} ) !`
                        );
                    }
                })
                .catch((error) => {
                    this.$message.error(error);
                });
        },
    },
    filters: {
        readableDate: function (date) {
            return dayjs(date).locale("fr").format("dddd D MMMM YYYY");
        },
    },
    watch: {
        search: function (newVal) {
            this.$router.push({
                query: this.search
                    ? { ...this.$route.query, q: this.search }
                    : this.$route.query,
            });
        },
    },
    computed: {
        filteredAds: function () {
            const category = this.$route.params.category;
            const categoryFilter = (ad) =>
                category
                    ? validateUuid(category)
                        ? ad.author.id === category
                        : ad.categories.toLowerCase() === category
                    : true;
            const searchFilter = (ad) =>
                this.search
                    ? ad.title.toLowerCase().includes(this.search) ||
                      ad.description.toLowerCase().includes(this.search)
                    : true;
            return this.ads.filter(
                (ad) => categoryFilter(ad) && searchFilter(ad)
            );
        },
    },
    mounted() {
        this.search = this.$route.query.q;
    },
};
</script>

<style scoped>
.body {
    padding: 20px;
}

.el-popover {
    text-align: left !important;
}

.nav-market-category {
    color: black;
    text-transform: capitalize;
    font-size: 17px;
    padding: 15px 5px 15px 15px;
    border-radius: 15px;
    text-decoration: none;
    display: block;
}

.nav-market-category.active {
    background-color: hsl(190, 23%, 90%);
    font-weight: bold;
}

.nav-market-category:hover {
    background-color: hsl(186, 50%, 96%);
}
</style>
