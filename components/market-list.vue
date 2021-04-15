<template>
    <el-row type="flex" style="flex-wrap: wrap">
        <el-col
            class="card"
            :xs="12"
            :sm="8"
            :md="6"
            :xl="4"
            v-for="ad in ads"
            :key="ad.id"
        >
            <el-card
                @click.native="openAd(ad)"
                :class="ad.available ? 'available' : 'unavailable'"
            >
                <cld-image
                    class="card-img"
                    :public-id="
                        ad.picture ? ad.picture.replace('.heic', '.jpg') : ''
                    "
                    height="100%"
                    crop="fill"
                    fetchFormat="auto"
                    quality="auto"
                >
                </cld-image>

                <div class="card-desc" style="word-break: keep-all">
                    <h3>{{ ad.title | truncate }}</h3>
                    <div v-if="ad.categories === 'JEU'">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`Jouabilité ${ad.additionalData.rating}/5`"
                            placement="left"
                        >
                            <el-rate
                                v-if="ad.additionalData"
                                disabled
                                :max="5"
                                v-model="ad.additionalData.rating"
                            ></el-rate>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`Complexité ${ad.additionalData.difficulty}/5`"
                            placement="left"
                        >
                            <el-rate
                                :iconClasses="[
                                    'el-icon-cpu',
                                    'el-icon-cpu',
                                    'el-icon-cpu',
                                ]"
                                disabled-void-icon-class="el-icon-cpu"
                                v-if="ad.additionalData"
                                disabled
                                :max="5"
                                v-model="ad.additionalData.difficulty"
                            ></el-rate>
                        </el-tooltip>

                        <i class="el-icon-user"></i>
                        <span
                            v-if="
                                ad.additionalData.minPlayers &&
                                ad.additionalData.maxPlayers
                            "
                        >
                            {{
                                ad.additionalData
                                    ? `${ad.additionalData.minPlayers} - ${ad.additionalData.maxPlayers}`
                                    : "no data"
                            }}
                        </span>
                        <span v-else>No data</span>
                        <br />
                        <i class="el-icon-timer"></i>
                        <span
                            v-if="
                                ad.additionalData.minPlayers &&
                                ad.additionalData.maxPlayers
                            "
                        >
                            {{
                                ad.additionalData
                                    ? `${ad.additionalData.playingTime} minutes`
                                    : "no data"
                            }}
                        </span>
                        <span v-else>No data</span>
                    </div>
                    {{ ad.description }}
                </div>
            </el-card>
        </el-col>

        <el-dialog
            width="80%"
            v-if="ad.author"
            :before-close="handleClose"
            :fullscreen="$device.isMobile"
            :title="ad.available ? ad.title : ad.title + ' (indisponible)'"
            :visible.sync="dialogAdVisible"
        >
            <el-row :span="24">
                <el-col
                    :sm="24"
                    :md="12"
                    style="padding: 30px; text-align: center"
                >
                    <cld-image
                        width="100%"
                        height="100%"
                        :public-id="
                            ad.picture
                                ? ad.picture.replace('.heic', '.jpg')
                                : ''
                        "
                        crop="fill"
                        fetchFormat="auto"
                        quality="auto"
                    >
                    </cld-image>
                </el-col>
                <el-col :sm="24" :md="12">
                    <div v-if="ad.author.id === $auth.user.id">
                        <br />
                        <el-switch
                            @change="updateAdAvailability(ad.id, ad.available)"
                            v-model="ad.available"
                            active-text="disponible"
                            inactive-text="indisponible"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        >
                            >
                        </el-switch>
                        <br /><br />
                        <el-popover
                            placement="top"
                            width="160"
                            v-model="confirmAdDeletion"
                        >
                            <p>Confirmer la suppression</p>
                            <div style="text-align: right; margin: 0">
                                <el-button
                                    size="mini"
                                    type="text"
                                    @click="confirmAdDeletion = false"
                                    >Non</el-button
                                >
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="deleteAd(ad.id)"
                                    >Oui</el-button
                                >
                            </div>
                            <el-button slot="reference" type="danger"
                                >Supprimer l'annonce</el-button
                            >
                        </el-popover>
                        <br />
                        <br />
                        <el-divider></el-divider>
                    </div>
                    <div v-if="ad.categories === 'JEU'">
                        <el-row :span="24">
                            <el-col :sm="12" :md="6">
                                Jouabilité:
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="`Jouabilité ${ad.additionalData.rating}/5`"
                                    placement="left"
                                >
                                    <el-rate
                                        v-if="ad.additionalData"
                                        disabled
                                        :max="5"
                                        v-model="ad.additionalData.rating"
                                    ></el-rate>
                                </el-tooltip>
                                <br />
                            </el-col>
                            <el-col :sm="12" :md="6">
                                Complexité:
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="`Complexité ${ad.additionalData.difficulty}/5`"
                                    placement="left"
                                >
                                    <el-rate
                                        :iconClasses="[
                                            'el-icon-cpu',
                                            'el-icon-cpu',
                                            'el-icon-cpu',
                                        ]"
                                        disabled-void-icon-class="el-icon-cpu"
                                        v-if="ad.additionalData"
                                        disabled
                                        :max="5"
                                        v-model="ad.additionalData.difficulty"
                                    ></el-rate></el-tooltip
                                ><br
                            /></el-col>
                            <el-col :sm="12" :md="6">
                                <i class="el-icon-user"></i>
                                <span
                                    v-if="
                                        ad.additionalData.minPlayers &&
                                        ad.additionalData.maxPlayers
                                    "
                                >
                                    {{
                                        ad.additionalData
                                            ? `${ad.additionalData.minPlayers} - ${ad.additionalData.maxPlayers} joueurs`
                                            : "pas de données"
                                    }}
                                </span>
                                <span v-else>Aucune donnée</span></el-col
                            >
                            <el-col :sm="12" :md="6">
                                <i class="el-icon-timer"></i>
                                <span
                                    v-if="
                                        ad.additionalData.minPlayers &&
                                        ad.additionalData.maxPlayers
                                    "
                                >
                                    {{
                                        ad.additionalData
                                            ? `${ad.additionalData.playingTime} minutes`
                                            : "pas de données"
                                    }}
                                </span>
                                <span v-else>Aucune donnée</span></el-col
                            >
                        </el-row>

                        <br />
                        <el-divider></el-divider>
                    </div>
                    Mis à disposition par
                    <pop-profil :user="ad.author"></pop-profil>
                    <br />
                    <br />
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        :href="`mailto:${ad.author.email}?subject=Prêt sur H2T - ${ad.title}`"
                        ><el-button type="primary"
                            ><em class="el-icon-message"></em> envoyer un email
                            à
                            {{ ad.author.firstName }}
                        </el-button></a
                    >
                    <br />
                    <br />
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        v-if="ad.author.facebookUrl"
                        :href="ad.author.facebookUrl | parseFbMessenger"
                        ><el-button type="primary"
                            ><em class="el-icon-chat-dot-round"></em> contacter
                            {{ ad.author.firstName }} par facebook</el-button
                        ></a
                    >
                    <div id="map-wrap" style="height: 20vh; margin-top: 20px">
                        <client-only>
                            <l-map :zoom="15" :center="this.geoJSONSearch">
                                <l-tile-layer
                                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                ></l-tile-layer>
                                <l-marker
                                    :lat-lng="this.geoJSONSearch"
                                ></l-marker>
                            </l-map>
                        </client-only>
                    </div>
                    <div v-if="ad.description != ''">
                        <el-divider></el-divider>
                        <span style="font-size: 30px">“</span>
                        <span
                            style="font-size: 20px; word-break: keep-all"
                            v-html="linkDetection(ad.description)"
                        >
                        </span>
                        <span style="font-size: 30px">”</span>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
import { BingProvider } from "leaflet-geosearch";
import dayjs from "dayjs";
import Autolinker from "autolinker";
import gql from "graphql-tag";

const mapProvider = new BingProvider({
    params: {
        key: process.env.BING_MAP_KEY,
    },
});

export default {
    props: ["ads"],
    data() {
        return {
            confirmAdDeletion: false,
            geoJSONSearch: [47.41322, -1.219482],
            dialogAdVisible: false,
            ad: {
                id: "",
                title: "",
                description: "",
                author: null,
                zipCode: "",
                categories: "",
                additionalData: {},
                available: null,
            },
        };
    },
    methods: {
        async updateAdAvailability(id, available) {
            return await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation updateAd($id: String!, $available: Boolean) {
                            updateOneAd(
                                where: { id: $id }
                                data: { available: { set: $available } }
                            ) {
                                id
                                available
                            }
                        }
                    `,
                    variables: {
                        id,
                        available,
                    },
                })
                .then((resp) => {
                    if (resp.errors) {
                        this.$message.error(resp.errors[0].message);
                    } else {
                        this.$emit("refetchAds");
                        this.$message.success("Annonce mise à jour");
                    }
                })
                .catch((error) => {
                    this.$message.error(error);
                });
        },
        async deleteAd(id) {
            this.confirmAdDeletion = false;
            return await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation deleteAd($id: String!) {
                            deleteOneAd(where: { id: $id }) {
                                id
                            }
                        }
                    `,
                    variables: {
                        id,
                    },
                })
                .then((resp) => {
                    if (resp.errors) {
                        this.$message.error(resp.errors[0].message);
                    } else {
                        this.$emit("refetchAds");
                        this.dialogAdVisible = false;
                        this.$router.push({
                            name: "eggs-market-category",
                            query: {},
                        });
                        this.$message.success("Annonce supprimée");
                    }
                })
                .catch((error) => {
                    this.$message.error(error);
                });
        },
        linkDetection: function (data) {
            return Autolinker.link(data);
        },
        filterCategory: function (category) {
            this.$router.push({
                name: "eggs-market-category",
                params: { category: category.toLowerCase() },
                query: {},
            });
        },
        openAd: async function (ad) {
            this.ad = ad;
            this.$router.push({ query: { ...this.$route.query, id: ad.id } });
            this.dialogAdVisible = true;
            const results = await mapProvider.search({
                query: `Montreal ${ad.zipCode}`,
            });
            this.geoJSONSearch = results[0].raw.point.coordinates;
        },
        handleClose(done) {
            const { id, ...query } = this.$route.query;
            this.$router.push({ query });
            done();
        },
    },
    filters: {
        readableDate: function (date) {
            return dayjs(date).locale("fr").format("dddd D MMMM YYYY");
        },
        truncate: function (text, clamp) {
            return text.slice(0, 35) + (35 < text.length ? clamp || "..." : "");
        },
        parseFbMessenger: function (data) {
            return `https://m.me/${data.split("/").filter(Boolean).pop()}`;
        },
    },
    watch: {
        ads: function (newVal) {
            const id = this.$route.query.id;
            if (id) {
                const ads = JSON.parse(JSON.stringify(newVal));
                this.openAd(
                    ads.filter((ad) => {
                        return ad.id === id;
                    })[0]
                );
            }
        },
    },
};
</script>

<style>
.el-card__body {
    padding: 0px;
}

.card {
    padding: 10px;
    word-break: break-all;
    cursor: pointer;
}

.card-desc {
    height: 8vh;
    padding: 14px;
    transition: 0.3s;
}

.card-img {
    height: 20vh;
    transition: 0.3s;
    text-align: center;
}

.el-card.is-always-shadow.unavailable {
    box-shadow: 0 2px 12px 0 rgb(255 0 0 / 40%);
}

.el-card.is-always-shadow.available {
    box-shadow: 0 2px 12px 0 rgb(0 255 0 / 40%);
}

@media screen and (max-width: 600px) {
    .card-img {
        height: 13vh;
    }
    .card-desc {
        height: 15vh;
    }
}

.card:hover .card-desc {
    height: 28vh;
}

.card:hover .card-img {
    height: 0vh;
    opacity: 0;
}
</style>
