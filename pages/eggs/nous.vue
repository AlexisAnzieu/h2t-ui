<template>
    <el-row style="padding: 30px" v-loading="$apollo.loading">
        <el-col :xl="12" :lg="24" v-for="user in users" :key="user.first_name">
            <el-card shadow="hover">
                <el-row>
                    <el-col :lg="3" :sm="5">
                        <el-image
                            style="width: 100%; height: 100%; display: block"
                            :src="
                                user.picture ||
                                'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                            "
                            fit="cover"
                        ></el-image>
                    </el-col>
                    <el-col :lg="13" :sm="10" style="padding: 10px">
                        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
                        <h3>{{ user.email }}</h3>
                        <br />
                        Invité.e il y a
                        {{ user.createdAt | firstSubscriptionDate }} jours par

                        <pop-profil
                            v-if="user.invitedBy"
                            :user="user.invitedBy"
                        ></pop-profil>
                        <span v-else>lui-même</span>
                        <br />
                        <br />
                        <nuxt-link :to="`/user/${user.id}`">
                            <el-button size="small">Profil</el-button>
                        </nuxt-link>
                        <el-badge :value="user.ads.length" type="primary">
                            <nuxt-link :to="`/eggs/market/${user.id}`">
                                <el-button size="small">Annonces</el-button>
                            </nuxt-link>
                        </el-badge>
                    </el-col>
                    <el-col :lg="5" :sm="9" style="padding: 20px">
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            :href="`mailto:${user.email}`"
                            ><el-button type="primary"
                                ><em class="el-icon-message"></em> envoyer un
                                email à {{ user.firstName }}
                            </el-button></a
                        >
                        <br /><br />
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            v-if="user.facebookUrl"
                            :href="user.facebookUrl | parseFbMessenger"
                            ><el-button type="primary"
                                ><em class="el-icon-chat-dot-round"></em>
                                contacter {{ user.firstName }} par
                                facebook</el-button
                            ></a
                        >
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import gql from "graphql-tag";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export default {
    head() {
        return {
            title: "H2T.communauté",
        };
    },
    data() {
        return {
            users: [],
        };
    },
    apollo: {
        users: {
            query: gql`
                query getUsers {
                    users(orderBy: { firstName: asc }) {
                        id
                        firstName
                        lastName
                        description
                        createdAt
                        picture
                        email
                        facebookUrl
                        ads {
                            id
                        }
                        invitedBy {
                            firstName
                            id
                            picture
                            createdAt
                        }
                    }
                }
            `,
        },
    },
    filters: {
        parseFbMessenger: function (data) {
            return `https://m.me/${data.split("/").filter(Boolean).pop()}`;
        },
        firstSubscriptionDate: function (date) {
            return dayjs().diff(dayjs(date), "day");
        },
    },
};
</script>

<style>
.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
