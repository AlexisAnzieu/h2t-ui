<template>
    <el-col style="padding-top: 30px" :lg="{ span: 21, offset: 1 }" :md="24">
        <el-button
            type="primary"
            icon="el-icon-document"
            @click="dialogFormVisible = true"
            :disabled="error"
            >Ecris ton poème</el-button
        >

        <el-table
            v-loading="$apollo.loading"
            empty-text="Aucun poème"
            @cell-click="openPoem"
            :data="poems"
            style="width: 100%"
        >
            <el-table-column
                prop="title"
                label="Titre"
                min-width="170px"
                sortable
            ></el-table-column>
            <el-table-column
                prop="author.firstName"
                label="Auteur"
                sortable
            ></el-table-column>
        </el-table>

        <el-dialog
            :fullscreen="$device.isMobile"
            title="Ton beau poème"
            :visible.sync="dialogFormVisible"
        >
            <el-dialog
                center
                :show-close="false"
                width="90%"
                title="Est-ce ton ultime bafouille?"
                :visible.sync="dialogFormConfirmationVisible"
                append-to-body
            >
                <pre v-loading="sendingPoem">{{ this.form.description }}</pre>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        :disabled="sendingPoem"
                        type="primary"
                        @click="createPoem('form')"
                        >Oui (posté
                        {{
                            this.form.anonymous
                                ? "anonymement"
                                : `en tant que ${this.$auth.user.firstName}`
                        }})</el-button
                    >
                </span>
            </el-dialog>

            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="Titre" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item prop="description">
                    <el-input
                        style="display: inline"
                        :autosize="{ minRows: 6 }"
                        type="textarea"
                        v-model="form.description"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    :label="`Poster ${
                        form.anonymous
                            ? 'anonymement'
                            : 'en tant que ' + this.$auth.user.firstName
                    }`"
                >
                    <el-switch v-model="form.anonymous"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"
                    >Annuler</el-button
                >
                <el-button type="primary" @click="confirmCreatePoem('form')"
                    >Envoyer</el-button
                >
            </span>
        </el-dialog>

        <el-dialog
            :fullscreen="$device.isMobile"
            :title="poem.title"
            :visible.sync="dialogPoemVisible"
        >
            écrit le {{ poem.createdAt | readableDate }} par
            {{ poem.author === null ? "un anonyme" : poem.author.firstName }}
            <el-divider></el-divider>
            <span style="font-size: 30px">“</span>
            <span
                style="
                    font-size: 20px;
                    word-break: keep-all;
                    white-space: pre-wrap;
                "
                >{{ poem.description }}</span
            >
            <span style="font-size: 30px">”</span>
        </el-dialog>
    </el-col>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/fr";
import gql from "graphql-tag";

export default {
    head() {
        return {
            title: "H2T.spotted",
        };
    },
    auth: false,
    data() {
        return {
            error: false,
            sendingPoem: false,
            lockSubmit: false,
            dialogPoemVisible: false,
            dialogFormVisible: false,
            dialogFormConfirmationVisible: false,
            form: {
                title: "",
                description: "",
                anonymous: true,
                author: null,
            },
            poem: {
                title: "",
                description: "",
                author: null,
            },
            rules: {
                title: [
                    {
                        required: true,
                        min: 5,
                        max: 20,
                        message: "Le titre doit faire entre 5 et 20 caractères",
                    },
                ],
                description: [
                    {
                        required: true,
                        min: 30,
                        message:
                            "La description doit faire au moins 30 caractères",
                    },
                ],
            },
        };
    },
    apollo: {
        poems: gql`
            query getPoems {
                poems(orderBy: { updatedAt: desc }) {
                    title
                    description
                    createdAt
                    author {
                        firstName
                    }
                }
            }
        `,
    },
    methods: {
        createPoem: function (form) {
            this.sendingPoem = true;
            this.$apollo
                .mutate({
                    mutation: gql`
                        mutation createPoem(
                            $title: String!
                            $description: String!
                            $author: Int
                        ) {
                            createOnePoem(
                                data: {
                                    title: $title
                                    description: $description
                                    author: { connect: { id: $author } }
                                }
                            ) {
                                title
                                description
                                createdAt
                                author {
                                    firstName
                                }
                            }
                        }
                    `,
                    variables: this.form,
                })
                .then((resp) => {
                    if (resp.errors) {
                        this.$message.error(resp.errors[0].message);
                    } else {
                        this.poems.unshift(resp.data.createOnePoem);
                        this.$message.success("Force et honneur 💪");
                        this.dialogFormConfirmationVisible = false;
                        this.dialogFormVisible = false;
                        this.$refs[form].resetFields();
                        this.sendingPoem = false;
                    }
                })
                .catch((error) => {
                    this.$message.error(error);
                });
        },
        confirmCreatePoem: function (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.dialogFormConfirmationVisible = true;
                } else {
                    this.$message.error(
                        "Merci de corriger les champs incorrects"
                    );
                    return false;
                }
            });
        },
        openPoem: function (poem) {
            this.poem = poem;
            this.dialogPoemVisible = true;
        },
    },
    filters: {
        readableDate: function (pDate) {
            return dayjs(pDate).locale("fr").format("dddd D MMMM YYYY");
        },
    },
};
</script>

<style>
.body {
    padding: 20px;
}
</style>
