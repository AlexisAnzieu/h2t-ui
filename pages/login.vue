<template>
    <el-col style="padding: 20px" :lg="{ span: 12, offset: 6 }" :md="24">
        <el-tabs value="login" v-model="activeTab">
            <el-tab-pane label="Déja inscrit?" name="login">
                <el-form
                    @keyup.enter.native="sendLoginForm('loginForm')"
                    :model="loginForm"
                    ref="loginForm"
                >
                    <el-form-item
                        label="Email"
                        prop="email"
                        :rules="[
                            {
                                required: true,
                                message:
                                    'Impossible de te connecter sans ton email',
                                trigger: 'blur',
                            },
                            {
                                type: 'email',
                                message:
                                    'Cette adresse mail ne semble pas valide',
                                trigger: ['blur', 'change'],
                            },
                        ]"
                    >
                        <el-input v-model="loginForm.email"></el-input>
                    </el-form-item>

                    <el-form-item
                        label="Mot de passe"
                        prop="password"
                        :rules="[
                            {
                                required: true,
                                message:
                                    'Impossible de te connecter sans ton mot de passe',
                                trigger: 'blur',
                            },
                            {
                                type: 'string',
                                min: 6,
                                message:
                                    '6 caractères minimum pour la sécurité',
                                trigger: ['blur', 'change'],
                            },
                        ]"
                    >
                        <el-input
                            type="password"
                            v-model="loginForm.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="sendLoginForm('loginForm')"
                            v-loading.fullscreen.lock="fullscreenLoading"
                        >
                            Se connecter
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="...ou pas?" name="signup">
                <el-divider content-position="center"
                    >Tu dois remplir ces champs</el-divider
                >

                <el-form
                    @keyup.enter.native="sendSignupForm('signupForm')"
                    :model="signupForm"
                    ref="signupForm"
                >
                    <el-form-item
                        label="Numéro d'invitation"
                        prop="invitation"
                        :rules="[
                            {
                                required: true,
                                message:
                                    'Les inscriptions se font uniquement par invitation',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input v-model="signupForm.invitation"
                            ><template slot="prepend">H2Ti</template></el-input
                        >
                    </el-form-item>
                    <el-form-item
                        label="Prénom"
                        prop="firstName"
                        :rules="[
                            {
                                required: true,
                                message:
                                    'Un prénom est nécessaire afin de pouvoir t\'identifier sur le site',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input v-model="signupForm.firstName"></el-input>
                    </el-form-item>

                    <el-form-item
                        label="Email"
                        prop="email"
                        :rules="[
                            {
                                required: true,
                                message:
                                    'Cet email te permettra de te connecter',
                                trigger: 'blur',
                            },
                            {
                                type: 'email',
                                message:
                                    'Cette adresse mail ne nous semble pas valide',
                                trigger: ['blur', 'change'],
                            },
                        ]"
                    >
                        <el-input v-model="signupForm.email"></el-input>
                    </el-form-item>

                    <el-form-item
                        label="Mot de passe"
                        prop="password"
                        :rules="[
                            {
                                required: true,
                                message:
                                    'Ce mot de passe te permettra de te connecter',
                                trigger: 'blur',
                            },
                            {
                                type: 'string',
                                min: 6,
                                message:
                                    '6 caractères minimum pour la sécurité',
                                trigger: ['blur', 'change'],
                            },
                        ]"
                    >
                        <el-input
                            type="password"
                            v-model="signupForm.password"
                        ></el-input>
                    </el-form-item>
                    <br />
                    <el-divider content-position="center"
                        >Tu peux remplir ces champs</el-divider
                    >

                    <el-form-item label="Nom de famille" prop="lastName">
                        <el-input
                            placeholder="Pour te retrouver encore plus facilement sur le site"
                            v-model="signupForm.lastName"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Date d'anniversaire" prop="birthday">
                        <el-date-picker
                            type="date"
                            placeholder="Pour t'envoyer des cadeaux"
                            v-model="signupForm.birthday"
                            style="width: 100%"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item
                        label="URL de ton profil facebook"
                        prop="lastName"
                    >
                        <el-input
                            placeholder="Si tu ne lis pas souvent tes mails"
                            v-model="signupForm.facebookUrl"
                        ></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="sendSignupForm('signupForm')">
                            S'inscrire à H2T
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<style scoped>
.login-button {
    border: 0;
}
</style>

<script>
import gql from "graphql-tag";

export default {
    data() {
        return {
            activeTab: "login",
            from: null,
            fullscreenLoading: false,
            signupForm: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                facebookUrl: "",
                birthday: "",
                invitation: "",
            },
            loginForm: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        sendLoginForm(formName) {
            this.fullscreenLoading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$apollo
                        .mutate({
                            mutation: gql`
                                mutation sendLoginForm(
                                    $email: String!
                                    $password: String!
                                ) {
                                    login(
                                        loginInput: {
                                            email: $email
                                            password: $password
                                        }
                                    ) {
                                        token
                                        code
                                        message
                                        user {
                                            id
                                            firstName
                                            picture
                                            level
                                        }
                                    }
                                }
                            `,
                            variables: this.loginForm,
                        })
                        .then(async (resp) => {
                            if (resp.data.login.code === 200) {
                                this.$message.success({
                                    message: resp.data.login.message,
                                });
                                this.$apolloHelpers.onLogin(
                                    resp.data.login.token
                                );
                                this.$auth.setUser(resp.data.login.user);
                                if (this.from) {
                                    this.$router.go(-1);
                                } else {
                                    this.$router.push("profil");
                                }
                                this.fullscreenLoading = false;
                            } else {
                                this.fullscreenLoading = false;
                                this.$message.error({
                                    message: resp.data.login.message,
                                });
                            }
                        })
                        .catch((error) => {
                            this.fullscreenLoading = false;
                            this.$message.error(error.message);
                        });
                } else {
                    this.fullscreenLoading = false;
                    return false;
                }
            });
        },
        sendSignupForm(formName) {
            this.fullscreenLoading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$apollo
                        .mutate({
                            mutation: gql`
                                mutation sendSignupForm(
                                    $firstName: String!
                                    $email: String!
                                    $password: String!
                                    $invitation: String!
                                    $birthday: String
                                    $facebookUrl: String
                                    $lastName: String
                                ) {
                                    signup(
                                        signupInput: {
                                            firstName: $firstName
                                            email: $email
                                            password: $password
                                            invitation: $invitation
                                            birthday: $birthday
                                            facebookUrl: $facebookUrl
                                            lastName: $lastName
                                        }
                                    ) {
                                        message
                                        code
                                        token
                                        user {
                                            id
                                            firstName
                                            picture
                                            level
                                        }
                                    }
                                }
                            `,
                            variables: this.signupForm,
                        })
                        .then((resp) => {
                            if (resp.data.signup.code === 200) {
                                this.$message.success({
                                    message: resp.data.signup.message,
                                });
                                this.$apolloHelpers.onLogin(
                                    resp.data.signup.token
                                );
                                this.$auth.setUser(resp.data.signup.user);
                                this.$router.push("profil");
                                this.fullscreenLoading = false;
                            } else {
                                this.fullscreenLoading = false;
                                this.$message.error({
                                    message: resp.data.signup.message,
                                });
                            }
                        })
                        .catch((error) => {
                            this.fullscreenLoading = false;
                            console.error(error);
                        });
                } else {
                    this.fullscreenLoading = false;
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.from = from.name;
        });
    },
    async mounted() {
        if (this.$route.query.token) {
            this.fullscreenLoading = true;
            return await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation accountActivation($token: String!) {
                            accountActivation(token: $token) {
                                message
                                code
                            }
                        }
                    `,
                    variables: {
                        token: this.$route.query.token,
                    },
                })
                .then((resp) => {
                    if (resp.data.accountActivation.code === 200) {
                        this.loginForm.email =
                            resp.data.accountActivation.message;
                        this.$message.success({
                            message:
                                "Ton compte est maintenant activé, tu peux te connecter!",
                        });
                    } else {
                        this.$message.error({
                            message:
                                "Erreur lors de l'activation de ton compte",
                        });
                    }
                    this.fullscreenLoading = false;
                })
                .catch((error) => {
                    this.$message.error({
                        message: error.message,
                        duration: 4000,
                    });
                });
        } else if (this.$route.query.invitation && this.$route.query.email) {
            this.activeTab = "signup";
            this.signupForm.email = this.$route.query.email;
            this.signupForm.invitation = this.$route.query.invitation;
        }
    },
};
</script>
