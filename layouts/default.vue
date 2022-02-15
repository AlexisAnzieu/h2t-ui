<template>
    <client-only>
        <el-row>
            <el-col
                @mouseleave.native="leftNavWidth = 1"
                @mouseover.native="leftNavWidth = $device.isMobile ? 18 : 7"
                class="eggs"
                :span="leftNavWidth"
            >
                <el-row align="middle">
                    <el-col
                        class="egg-cover"
                        :class="{ active: $nuxt.$route.path === '/' }"
                        :span="24"
                    >
                        <nuxt-link to="/">
                            <div
                                class="egg-title"
                                :class="{ active: $nuxt.$route.path === '/' }"
                            >
                                .accueil
                            </div>
                        </nuxt-link>
                        <div
                            :style="`background-image: url('https://res.cloudinary.com/dkbuiehgq/image/upload/f_auto/v1612507002/H2T/nav/accueil.jpg')`"
                            class="bg-image"
                        ></div>
                    </el-col>
                    <el-col
                        v-for="egg in eggs"
                        :key="egg"
                        class="egg-cover"
                        :class="{
                            active: $nuxt.$route.path.startsWith(
                                `/eggs/${egg}`
                            ),
                        }"
                        :span="24"
                    >
                        <nuxt-link :to="`/eggs/${egg}`">
                            <div
                                class="egg-title"
                                :class="{
                                    active: $nuxt.$route.path.startsWith(
                                        `/eggs/${egg}`
                                    ),
                                }"
                            >
                                .{{ egg }}
                            </div>
                        </nuxt-link>
                        <div
                            :style="`background-image: url('https://res.cloudinary.com/dkbuiehgq/image/upload/f_auto/H2T/nav/${egg}.jpg')`"
                            class="bg-image"
                        ></div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col
                v-touch:tap="gestureHandler"
                v-touch:swipe.right="gestureHandler"
                class="section"
                :span="24 - leftNavWidth"
            >
                <el-row class="navbar">
                    <el-col
                        id="headwayapp"
                        style="text-align: center; padding: 7px 0px 0px 7px"
                        :span="$device.isMobile ? 2 : 2"
                    >
                    </el-col>
                    <el-col
                        style="text-align: center; padding: 10px"
                        :span="$device.isMobile ? 15 : 19"
                    >
                        <h2 v-if="$nuxt.$route.path.startsWith(`/eggs/market`)">
                            Locations et services gratuits
                        </h2>
                    </el-col>
                    <el-col :span="2">
                        <el-dropdown
                            trigger="click"
                            v-if="this.$auth.loggedIn"
                            @command="userOptions"
                        >
                            <el-avatar
                                class="avatar-nav"
                                :size="50"
                                :src="
                                    this.$auth.user.picture
                                        ? this.$auth.user.picture
                                        : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                                "
                            ></el-avatar>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    command="profil"
                                    icon="el-icon-people-button"
                                    >Profil</el-dropdown-item
                                >
                                <el-dropdown-item
                                    divided
                                    command="logout"
                                    style="color: red"
                                    icon="el-icon-switch-button"
                                    >Se déconnecter</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>

                        <div style="margin-left: -30px">
                            <NuxtLink
                                to="/login"
                                style="color: green"
                                v-if="!this.$auth.loggedIn"
                                ><el-button type="primary" icon="el-icon-user"
                                    >Login</el-button
                                >
                            </NuxtLink>
                        </div>
                    </el-col>
                </el-row>
                <div style="padding-top: 50px">
                    <nuxt />
                </div>
            </el-col>
        </el-row>
    </client-only>
</template>

<script>
export default {
    data() {
        return {
            leftNavWidth: 1,
            warningMessage: false,
        };
    },
    computed: {
        active: function () {
            return this.$nuxt.$route.path;
        },
        eggs: function () {
            const tabs = ["transition", "boiler", "talk"];
            if (this.$auth.user) {
                tabs.push("calendar", "nous");
            }
            if (this.$auth.user?.picture) {
                tabs.push("market");
            }
            return tabs.sort();
        },
    },
    methods: {
        gestureHandler(gesture) {
            if (
                !this.$device.isMobile ||
                (gesture !== "right" && !gesture.type)
            )
                return;
            this.leftNavWidth = gesture === "right" ? 18 : 1;
        },
        injectWarningPopUpForMobile: function () {
            this.warningMessage = true;
            this.$message({
                message:
                    "Les fonctionnalités de la version mobile de H2T sont limitées par rapport à la version bureau. Fais glisser l'écran vers la droite afin d'accéder au menu.",
                type: "warning",
                duration: 0,
                showClose: true,
                onClose: () => (this.warningMessage = false),
            });
        },
        logout: function () {
            this.$auth.logout();
            this.$apolloHelpers.onLogout();
            this.$message.success({
                message: "Tu es maintenant déconnecté",
            });
        },
        userOptions: async function (command) {
            switch (command) {
                case "logout":
                    this.logout();
                    break;
                case "profil":
                    this.$router.push({
                        path: "/profil",
                    });
                    break;
                default:
                    break;
            }
        },
    },
    async mounted() {
        if (this.$device.isMobile && !this.warningMessage) {
            this.injectWarningPopUpForMobile();
        }

        //Inject Headway app script
        let headway = document.getElementById("headwayapp");
        if (headway) return; //Script already appended

        //Create promise which resolves on script load
        let promise = new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.src = "//cdn.headwayapp.co/widget.js";
            script.id = "headway-script";
            script.setAttribute("async", true);
            document.head.appendChild(script);
            script.onload = resolve; //Resolve when loaded
            script.onerror = reject;
        });
        await promise; //Await for the script to be resolved

        //Init the widget now that the script has loaded
        Headway.init({
            selector: "#headwayapp",
            account: "yEQV8y",
        });
    },
};
</script>

<style>
html {
    font-family: montserrat, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}

.eggs {
    -webkit-box-shadow: 2px 1px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 1px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 2px 1px 5px 0px rgba(0, 0, 0, 0.75);
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
    -webkit-overflow-scrolling: touch;
    text-align: center;
    transition: width 0.5s;
    background: rgba(6, 3, 51, 0.925);
}

.egg-cover {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 15vh;
    transition: transform 0.1s;
    z-index: 0;
    position: relative;
}

.egg-cover:hover {
    transform: scale(1.15);
    z-index: 2;
    position: relative;
}

.egg-cover.active {
    transform: scale(1.2);
    z-index: 1;
    position: relative;
}

.egg-title {
    position: absolute;
    background: rgba(6, 3, 51, 0.87);
    width: 100%;
    height: 15vh;
    padding: 4vh;
    font-size: 55px;
    color: white !important;
}

.egg-title.active {
    background: rgba(51, 48, 3, 0.479);
}

.egg-title:hover {
    background: rgba(34, 32, 2, 0.699);
}

.bg-image {
    width: 100%;
    height: 15vh;
    background-size: cover;
}

.section {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
    padding-top: 10px;
    padding-left: 6px;
    transition: width 0.5s;
}

.navbar {
    /* -webkit-box-shadow: 3px -3px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px -3px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px -3px 5px 0px rgba(0, 0, 0, 0.75); */
    width: 100vw;
    /* position: fixed; Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    background-color: white;
    padding: 5px;
    z-index: 1;
    position: fixed;
}

@media screen and (max-width: 600px) {
    .navbar {
        position: inherit;
    }
}

.avatar-nav {
    cursor: pointer;
}
</style>
