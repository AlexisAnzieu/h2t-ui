<template>
    <el-col style="padding-top: 30px" :lg="{ span: 21, offset: 1 }" :md="24">
        <el-row>
            <el-col :sm="24" :md="4">
                <el-button
                    style="width: 100%"
                    type="primary"
                    @click="dialogFormVisible = true"
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

            <el-col :sm="24" :md="{ span: 19, offset: 1 }">
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
                    v-loading="$apollo.loading"
                    :ads="filteredAds"
                ></market-list>
            </el-col>
        </el-row>

        <el-dialog
            :fullscreen="$device.isMobile"
            title="Déposer une annonce"
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
                    <el-input
                        placeholder="Appareil à raclette pour 6 personnes"
                        v-model="form.title"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    Photo
                    <el-upload
                        action="#"
                        ref="picturesUpload"
                        class="ad-pic-uploader"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="addPicture"
                        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                    >
                        <img
                            v-if="form.picture"
                            :src="form.picture"
                            class="ad-pic"
                        />
                        <i v-else class="el-icon-plus ad-pic-uploader-icon"></i>
                    </el-upload>
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
                <el-form-item label="Catégories" prop="categories">
                    <el-col :span="12">
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

        <el-dialog :visible.sync="dialogPreviewPicVisible">
            <img width="100%" :src="dialogPreviewImageUrl" alt="" />
        </el-dialog>
    </el-col>
</template>

<script>
import "dayjs/locale/fr";
import gql from "graphql-tag";

export default {
    head() {
        return {
            title: "H2T.market",
        };
    },
    auth: true,
    data() {
        return {
            dialogPreviewImageUrl: "",
            dialogPreviewPicVisible: false,
            search: null,
            geoJSONSearch: [47.41322, -1.219482],
            error: null,
            ads: [],
            sendingAd: false,
            lockSubmit: false,
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
                title: "",
                description: "",
                author: this.$auth.loggedIn
                    ? this.$store.state.auth.user.id
                    : null,
                zipCode: "",
                categories: "",
                picture: "",
            },
            ad: {
                id: "",
                title: "",
                description: "",
                author: null,
                zipCode: "",
                categories: "",
                picture: "",
            },
            rules: {
                title: [
                    {
                        required: true,
                        min: 5,
                        max: 50,
                        message: "Le titre doit faire entre 5 et 50 caractères",
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
                query {
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
                    }
                }
            `,
        },
    },
    methods: {
        async addPicture(file) {
            const isJPG = ["image/jpeg", "image/png", "image/jpg"].includes(
                file.raw.type
            );
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error(
                    "La format n'est pas au format JPEG,JPG ou PNG"
                );
            }
            if (!isLt2M) {
                this.$message.error("La photo est trop lourde (>2Mo) ");
            }

            if (isJPG && isLt2M) {
                const readData = (f) =>
                    new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(f);
                    });

                /* Read data */
                const data = await readData(file.raw);
                this.form.picture = data;
            }
        },
        async sendPicture() {
            return await this.$apollo.mutate({
                mutation: gql`
                    mutation($file: Upload!, $userId: Int!, $type: String) {
                        uploadPhoto(file: $file, userId: $userId, type: $type) {
                            message
                            code
                        }
                    }
                `,
                variables: {
                    file: this.form.picture,
                    userId: this.$auth.user.id,
                    type: "ad",
                },
            });
        },
        validateCategory: function (rule, value, callback) {
            if (rule.required && this.form.categories.length === 0) {
                callback(new Error(rule.message));
            }
            callback();
        },
        async createAd(form) {
            return this.$refs[form].validate(async (valid) => {
                if (valid) {
                    this.sendingAd = true;

                    const urlPic = (await this.sendPicture()).data.uploadPhoto
                        .message;

                    this.$apollo
                        .mutate({
                            mutation: gql`
                                mutation(
                                    $title: String!
                                    $description: String!
                                    $author: Int
                                    $zipCode: String!
                                    $categories: AdCategory
                                    $picture: String
                                ) {
                                    createOneAd(
                                        data: {
                                            title: $title
                                            description: $description
                                            author: { connect: { id: $author } }
                                            zipCode: $zipCode
                                            categories: $categories
                                            picture: $picture
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
                                    }
                                }
                            `,
                            variables: { ...this.form, picture: urlPic },
                        })
                        .then((resp) => {
                            if (this.$auth.user.level === 2) {
                                this.addUserLevel(1);
                            }
                            this.ads.unshift(resp.data.createOneAd);
                            this.$message.success("Merci encore! ✨");
                            this.dialogFormVisible = false;
                            this.$refs[form].resetFields();
                            this.form.picture = "";
                            this.$refs.picturesUpload.clearFiles();
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
        openAd: async function (ad) {
            this.ad = ad;
            this.dialogAdVisible = true;
            const results = await mapProvider.search({
                query: `Montreal ${ad.zipCode}`,
            });
            this.geoJSONSearch = results[0].raw.point.coordinates;
        },
        filterTag: function (value, row) {
            return row.categories.indexOf(value) >= 0;
        },
        async addUserLevel(level) {
            return await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation($userId: Int!, $level: Int) {
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
                category ? ad.categories.toLowerCase() === category : true;
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

<style>
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

.ad-pic-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.ad-pic-uploader .el-upload:hover {
    border-color: #409eff;
}
.ad-pic-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.ad-pic {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
