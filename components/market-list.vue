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
            <el-card @click.native="openAd(ad)">
                <cld-image
                    class="card-img"
                    :public-id="
                        ad.picture
                            ? ad.picture.replace('.heic', '.jpg')
                            : 'https://res.cloudinary.com/dkbuiehgq/image/upload/v1613112508/H2T/ads/ads_placeholder.svg'
                    "
                    width="100%"
                    height="100%"
                    crop="fill"
                    fetchFormat="auto"
                    quality="auto"
                >
                </cld-image>

                <div class="card-desc">
                    <h3>{{ ad.title | truncate }}</h3>
                    {{ ad.description }}
                </div>
            </el-card>
        </el-col>

        <el-dialog
            :before-close="handleClose"
            v-if="ad.author"
            :fullscreen="$device.isMobile"
            :title="ad.title"
            :visible.sync="dialogAdVisible"
        >
            proposé le {{ ad.createdAt | readableDate }} par
            <pop-profil :user="ad.author"></pop-profil>
            <br />
            <a
                rel="noopener noreferrer"
                target="_blank"
                :href="`mailto:${ad.author.email}?subject=Prêt sur H2T - ${ad.title}`"
                ><el-button type="primary"
                    ><em class="el-icon-message"></em> lui envoyer un email
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
                    ><em class="el-icon-chat-dot-round"></em> le contacter par
                    facebook</el-button
                ></a
            >
            <div id="map-wrap" style="height: 50vh; margin-top: 20px">
                <client-only>
                    <l-map :zoom="15" :center="this.geoJSONSearch">
                        <l-tile-layer
                            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        ></l-tile-layer>
                        <l-marker :lat-lng="this.geoJSONSearch"></l-marker>
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
        </el-dialog>
    </el-row>
</template>

<script>
import { BingProvider } from "leaflet-geosearch";
import dayjs from "dayjs";
import Autolinker from "autolinker";

const mapProvider = new BingProvider({
    params: {
        key: process.env.BING_MAP_KEY,
    },
});

export default {
    props: ["ads"],
    data() {
        return {
            geoJSONSearch: [47.41322, -1.219482],
            dialogAdVisible: false,
            ad: {
                id: "",
                title: "",
                description: "",
                author: null,
                zipCode: "",
                categories: "",
            },
        };
    },
    methods: {
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

@media screen and (max-width: 600px) {
    .card-img {
        height: 15vh;
    }
    .card-desc {
        height: 9vh;
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
