<template>
    <el-col :sm="24">
        <el-col
            v-loading="$apollo.loading"
            style="text-align: center; padding-top: 30px"
            :lg="{ span: 21, offset: 1 }"
            :md="24"
        >
            <img
                width="178px"
                height="178px"
                style="border-radius: 50%"
                :src="
                    this.user.picture
                        ? this.user.picture.replace('.heic', '.jpg')
                        : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                "
            />
            <br />
            <br />

            <el-divider>
                <h1>{{ this.user.firstName }} {{ this.user.lastName }}</h1>
            </el-divider>
            <br />
            <br />

            <el-popover placement="top" width="200" trigger="hover">
                <div style="text-align: center; word-break: normal">
                    La portée permet d'accéder à différents événements et
                    activités d'H2T
                </div>
                <el-button slot="reference" round>
                    Portée {{ this.user.level }}</el-button
                >
            </el-popover>

            <br />
            <br />
            <br />
        </el-col>

        <el-col
            v-loading="$apollo.loading"
            :md="11"
            :sm="24"
            style="padding: 50px"
        >
            <h3>Description</h3>
            {{ user.description }}
            <br /><br />
            <a
                rel="noopener noreferrer"
                target="_blank"
                :href="`mailto:${user.email}`"
                ><el-button type="primary"
                    ><em class="el-icon-message"></em> lui envoyer un email
                </el-button></a
            >
            <br /><br />
            <a
                rel="noopener noreferrer"
                target="_blank"
                v-if="user.facebookUrl"
                :href="user.facebookUrl | parseFbMessenger"
                ><el-button type="primary"
                    ><em class="el-icon-chat-dot-round"></em> le contacter par
                    facebook</el-button
                ></a
            >
        </el-col>
    </el-col>
</template>

<script>
import gql from "graphql-tag";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export default {
    auth: true,
    head() {
        return {
            title: "H2T.profil",
        };
    },
    data() {
        return {
            loadingApollo: false,
            ads: [],
            inviteEmail: null,
            user: {
                picture: null,
                facebookUrl: null,
                email: null,
                lastName: null,
                firstName: null,
                level: null,
                description: null,
                invitations: [],
            },
        };
    },
    apollo: {
        user: {
            query: gql`
                query getUser($userId: String!) {
                    user(where: { id: $userId }) {
                        picture
                        birthday
                        facebookUrl
                        email
                        level
                        firstName
                        lastName
                        description
                        invitations {
                            id
                            uid
                            sent
                            receiver {
                                email
                                createdAt
                            }
                        }
                    }
                }
            `,
            variables() {
                return {
                    userId: this.$route.params.id,
                };
            },
        },
        ads: {
            query: gql`
                query getUserAds($userId: String!) {
                    ads(
                        orderBy: { updatedAt: desc }
                        where: { authorId: { equals: $userId } }
                    ) {
                        title
                        description
                        createdAt
                        author {
                            firstName
                            picture
                            createdAt
                        }
                        zipCode
                        categories
                    }
                }
            `,
            variables() {
                return {
                    userId: this.$route.params.id,
                };
            },
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
.disabled-link {
    pointer-events: none;
    text-decoration: none;
    color: black;
}
</style>
