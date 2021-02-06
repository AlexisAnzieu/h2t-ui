<template>
    <el-row :gutter="24">
        <el-col
            style="
                font-size: 20px;
                padding: 0px 10% 0px 10%;
                line-height: 30px;
                text-align: justify;
            "
            :span="24"
        >
            <el-row>
                <el-col style="text-align: center">
                    <cld-image
                        public-id="/H2T/main/undraw_festivities_tvvj_wpbxwm.svg"
                        :width="$device.isMobile ? '100%' : '50%'"
                        fetchFormat="auto"
                        quality="auto"
                        loading="lazy"
                    />
                </el-col>
            </el-row>
            <strong v-if="this.$auth.user"
                >{{ this.$auth.user.firstName }},</strong
            ><br /><br />
            Tout d'abord, bienvenue sur la plateforme intra-communautaire locale
            <strong>H2T</strong>! <br />
            <br />
            <h3>Plateforme intra-communautaire locale?</h3>
            Le but de cette plateforme est de créer et d'entretenir un réseau de
            relations bienveillantes à travers des projets communs locaux
            (écologie, débats, radio, musique...). Autrement dit, un forum de
            partage de biens, de service et d'idées dans un cercle restreint.
            <br />
            <br />

            <h3>Que signifie H2T?</h3>
            La signification de H2T n'est pas fixe. Elle peut varier en fonction
            des projets et au gré du vent donc à toi de la définir comme tu le
            souhaites. Cependant lors de sa création elle portait sur trois
            idées:
            <br />
            👉 Code postal du Plateau-Mont-Royal (projet local)
            <br />
            👉 House 2 Techno (projet musical) <br />
            👉 Head 2 Toe - De la tête aux pieds (projet thématique)<br />

            <br />
            <h3>Pourquoi ne pas créer un groupe facebook?</h3>
            La principale raison concerne l'indépendance de cette plateforme et
            de ses usagers. Ici, les données ne sont pas vendues à d'autres
            organismes (le coût de l'hébergement du site est de 100$/an donc nul
            besoin d'élaborer de stratégie publicitaire). En outre, il est
            possible de coder de nouvelles fonctionnalités dépendament des
            besoins grandissant de la future communauté, le code source étant
            <a href="https://github.com/AlexisAnzieu/h2t-ui"
                >entièrement disponible en ligne</a
            >. Ce qui n'est pas le cas avec Facebook.
            <br />
            <br />
            <h3>Le projet a l'air sympatoche, comment s'inscrire?</h3>
            Les inscriptions ne se font que par invitation car la taille de
            cette communauté est limitée à 150 membres,
            <a href="https://fr.wikipedia.org/wiki/Nombre_de_Dunbar">
                "nombre maximum d'individus avec lesquels une personne peut
                entretenir simultanément une relation humaine stable".</a
            >
            Au delà de ce nombre il serait donc nécessaire de devoir mettre en
            place des règles contraignantes qui iraient à l'encontre de ce
            projet. <br />
            Si tu souhaites recevoir une invitation, envoie un mail à
            <a
                rel="noopener noreferrer"
                target="_blank"
                :href="`mailto:contact@h2t.club?subject=Je souhaite participer au projet H2T`"
                >cette adresse</a
            >
            décrivant en quelques lignes ton parcours personnel qui ne soit pas
            ton parcours professionnel (un hors-CV en quelque sorte) ainsi qu'un
            de tes accomplissements personnel dans un futur proche.
            <br />
            <br />
            <el-row>
                <el-col style="text-align: center">
                    <cld-image
                        public-id="/H2T/main/undraw_nature_fun_n9lv_cbxidj.svg"
                        width="60%"
                        fetchFormat="auto"
                        quality="auto"
                        loading="lazy"
                    />
                    <h4>
                        En te souhaitant une excellente {{ currentDateWord }} ❤️
                    </h4>
                </el-col>
                <el-col :sm="24" :md="15"> </el-col>
            </el-row>
            <el-divider></el-divider>
            PS: Si un trouble persiste dans ton esprit, envoie le à l'adresse
            email
            <a
                rel="noopener noreferrer"
                target="_blank"
                :href="`mailto:contact@h2t.club?subject=Je souhaite poser une question sur H2T`"
                >contact@h2t.club</a
            >. Une réponse te sera renvoyée et si la question se complète avec
            celles ci-dessus, elle sera ajoutée sur la page à son tour.
            <br />
            <br />
        </el-col>
    </el-row>
</template>

<script>
export default {
    auth: false,
    computed: {
        currentDateWord() {
            const hours = new Date().getHours();
            const isDayTime = hours > 5 && hours < 16;
            return isDayTime ? "journée ☀️" : "soirée 🌙";
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

h3 {
    text-align: left;
}
</style>
