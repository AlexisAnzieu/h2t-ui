<template>
    <el-col :sm="24">
        <el-col
            style="text-align: center; padding-top: 30px"
            :lg="{ span: 21, offset: 1 }"
            :md="24"
        >
            <avatar-upload @addLevel="addLevel" />
            <br />
            <el-divider>
                <h1>{{ this.user.firstName }} {{ this.user.lastName }}</h1>
            </el-divider>
            <br />
            <el-popover placement="top" width="200" trigger="hover">
                <div style="text-align: center; word-break: normal">
                    Augmenter ta portée te permettra d'accéder à différents
                    événements et activités d'H2T
                </div>
                <el-button slot="reference" round>
                    Portée {{ this.$auth.user.level }}</el-button
                >
            </el-popover>

            <br />
            <br />
            <el-steps
                v-if="this.$auth.user.level < 4"
                :active="this.$auth.user.level + 1"
                align-center
            >
                <el-step title="Te connecter"></el-step>
                <el-step title="Photo de profil"></el-step>
                <el-step title="Prêter un bien"></el-step>
                <el-step title="Te décrire"></el-step>
            </el-steps>
            <br />
            <br />
            <h4>
                Ton embarquement est complété à
                {{ this.$auth.user.level * 25 }}%
            </h4>
            <br />
            <h3 v-if="this.$auth.user.level === 1">
                Clique sur le visage ci-dessus et ajoute une photo de profil
            </h3>
            <h3 v-if="this.$auth.user.level === 2">
                N'hésite pas à partager un de tes bien en
                <nuxt-link to="/eggs/market"> cliquant ici!</nuxt-link>
            </h3>
            <h3 v-if="this.$auth.user.level === 3">
                Le décollage final! Décris toi afin que nous puissions en
                apprendre davantage sur toi!
            </h3>
            <br />
        </el-col>

        <el-col class="user-form" v-loading="$apollo.loading" :md="11" :sm="24">
            <el-form ref="form" :model="user" label-width="120px">
                <el-form-item
                    v-if="this.$auth.user.level >= 3"
                    label="Description"
                >
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4 }"
                        @blur="updateUser"
                        label="Ton profil facebook"
                        placeholder="Décris en quelques lignes ton parcours personnel qui ne soit pas ton parcours professionnel ainsi qu'un de tes accomplissements personnel dans un futur proche."
                        v-model="user.description"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="Prénom">
                    <el-input
                        @blur="updateUser"
                        label="Ton profil facebook"
                        placeholder="Please input"
                        v-model="user.firstName"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="Nom">
                    <el-input
                        @blur="updateUser"
                        label="Ton profil facebook"
                        placeholder="Please input"
                        v-model="user.lastName"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="Adresse email">
                    <span style="font-size: 12px">
                        (la modifier n'est pas possible pour le moment)
                    </span>
                    <el-input
                        disabled
                        @blur="updateUser"
                        label="Ton profil facebook"
                        placeholder="Please input"
                        v-model="user.email"
                    >
                    </el-input>
                </el-form-item>

                <br /><br /><br />
                Afin de te contacter plus rapidement, certaines personnes
                peuvent préférer t'envoyer un message sur facebook.
                <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.facebook.com/me"
                    >Clique ici</a
                >, et copie l'URL de ton profil facebook. <br /><br />
                <el-form-item label="Url facebook">
                    <el-input
                        @blur="updateUser"
                        placeholder="https://www.facebook.com/AlexisAnzieu"
                        v-model="user.facebookUrl"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col
            v-loading="$apollo.loading || loadingApollo"
            :md="11"
            :sm="24"
            style="padding: 50px"
        >
            <h3>Parraine tes connaissances</h3>
            <br />
            Tu connais certaines personnes susceptible de faire partie de la
            communauté? N'hésite pas à les convier ici!
            <br />
            <br />
            <strong>
                {{ invitationsToSend.length }}
                invitation(s) restante(s)
            </strong>
            <br />
            <br />

            <!-- TODO check if user is already in the list before sending an invite -->
            <el-input
                style="width: 300px"
                :disabled="invitationsToSend.length === 0"
                @keyup.enter.native.prevent="submitInvite(inviteEmail)"
                v-model="inviteEmail"
                placeholder="contact@h2t.club"
            ></el-input>
            <el-button
                :disabled="loadingApollo || invitationsToSend.length === 0"
                type="primary"
                @click="submitInvite(inviteEmail)"
                >Envoyer l'invitation</el-button
            >
            <el-table
                v-if="sentInvitations.length != 0"
                :data="sentInvitations"
                style="width: 100%"
            >
                <el-table-column prop="sent" label="Email"> </el-table-column>
                <el-table-column prop="uid" label="Code"> </el-table-column>
                <el-table-column label="Inscription" width="180">
                    <template slot-scope="scope">
                        {{
                            scope.row.receiver
                                ? `${
                                      scope.row.receiver.createdAt
                                      | firstSubscriptionDate
                                  } jour(s)`
                                : "en cours"
                        }}
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                            :disabled="scope.row.receiver !== null"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            ><i class="el-icon-delete"></i
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br />
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
                facebookUrl: null,
                email: null,
                lastName: this.$auth.user.lastName,
                firstName: this.$auth.user.firstName,
                level: this.$auth.user.level,
                description: null,
                invitations: [],
            },
        };
    },
    apollo: {
        user: {
            query: gql`
                query getUserProfile($userId: Int!) {
                    user(where: { id: $userId }) {
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
                    userId: this.$auth.user.id,
                };
            },
        },
        ads: {
            query: gql`
                query getUserAdsProfile($userId: Int!) {
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
                    userId: this.$auth.user.id,
                };
            },
        },
    },
    computed: {
        sentInvitations() {
            return this.user.invitations.filter(
                (invitation) => invitation.sent
            );
        },
        invitationsToSend() {
            return this.user.invitations.filter(
                (invitation) => !invitation.sent
            );
        },
    },
    filters: {
        firstSubscriptionDate: function (date) {
            return dayjs().diff(dayjs(date), "day");
        },
    },
    methods: {
        async updateInvitation(invitation, email = null) {
            this.loadingApollo = true;
            return await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation updateInvitation(
                            $invitationId: Int!
                            $sent: String
                        ) {
                            updateOneInvitation(
                                where: { id: $invitationId }
                                data: { sent: { set: $sent } }
                            ) {
                                id
                                uid
                                sent
                            }
                        }
                    `,
                    variables: {
                        invitationId: invitation.id,
                        sent: email ?? "",
                    },
                })
                .then((resp) => {
                    if (resp.errors) {
                        this.$message.error(resp.errors[0].message);
                    } else {
                        this.$message.success("Invitations mises à jour");
                    }
                    this.inviteEmail = null;
                })
                .catch((error) => {
                    this.$message.error(error);
                })
                .finally(() => {
                    this.loadingApollo = false;
                });
        },
        async handleDelete(index, row) {
            await this.updateInvitation(row);
        },
        async submitInvite(email) {
            const pickedInvitation = this.invitationsToSend.pop();
            await this.updateInvitation(pickedInvitation, email);
        },
        addLevel(level) {
            this.user.level += level;
            this.updateUser();
            this.$auth.setUser({
                ...this.$auth.user,
                level: this.user.level,
            });
        },
        async updateUser() {
            if (this.user.description && this.$auth.user.level === 3) {
                this.user.level = 4;
            }
            this.$message.info("Profil en cours de mise à jour");
            return await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation updateUser(
                            $userId: Int!
                            $facebookUrl: String
                            $firstName: String
                            $lastName: String
                            $email: String
                            $level: Int
                            $description: String
                        ) {
                            updateOneUser(
                                where: { id: $userId }
                                data: {
                                    lastName: { set: $lastName }
                                    firstName: { set: $firstName }
                                    facebookUrl: { set: $facebookUrl }
                                    email: { set: $email }
                                    level: { set: $level }
                                    description: { set: $description }
                                }
                            ) {
                                id
                            }
                        }
                    `,
                    variables: {
                        lastName: this.user.lastName,
                        facebookUrl: this.user.facebookUrl,
                        firstName: this.user.firstName,
                        email: this.user.email,
                        userId: this.$auth.user.id,
                        level: this.user.level,
                        description: this.user.description,
                    },
                })
                .then((resp) => {
                    this.$auth.setUser({
                        ...this.$auth.user,
                        level: this.user.level,
                    });
                    if (resp.errors) {
                        this.$message.error(resp.errors[0].message);
                    } else {
                        this.$message.success("Profil mis à jour");
                    }
                })
                .catch((error) => {
                    this.$message.error(error);
                });
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

.user-form {
    padding: 50px;
}

@media screen and (max-width: 600px) {
    .user-form {
        padding: 20px;
    }
}
</style>
