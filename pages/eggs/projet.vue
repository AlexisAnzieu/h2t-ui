<template>
    <el-row>
        <el-col :span="24" v-for="user in users" :key="user.first_name">
            <el-card :body-style="{ padding: '20px' }">
                <el-row type="flex" align="middle" style="text-align: center">
                    <el-col :span="10">
                        <h2>{{ user.first_name }}</h2>
                    </el-col>
                    <el-col :span="14">
                        <span>{{ user.projet }}</span>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    auth: false,
    head() {
        return {
            title: "H2T.projet",
        };
    },
    data() {
        return {
            users: [
                {
                    first_name: "Carla",
                    projet:
                        "Conférence HEC et voyage solitaire de 7 mois au Chili",
                },
                {
                    first_name: "Viviane",
                    projet:
                        "Durant le COVID, on m'a appris à tattouer et je suis rendue à pratiquer seule. Je monte mon studio à domicile et je devrais être prête à la fin de l'été",
                },
                {
                    first_name: "Jonathan",
                    projet: "Entrepreneuriat dans l'aviation durable",
                },
                {
                    first_name: "Julianne",
                    projet: `Je suis danseuse contemporaine,
C'est une vidéo danse créé assez spontanément pendant le confinement de manière participative et interactive
Le lien YouTube parlera davantage qu'une simple description!
youtu.be/1KZDQ5DwRV8`,
                },
                {
                    first_name: "Lucas",
                    projet: `Projet dont je suis content est quand j ai composé et réalisé un show avec un orchestre nouvelle génération`,
                },
                {
                    first_name: "Yoann",
                    projet: `Organisation d'un open air dans la ville à Toulouse`,
                },
                {
                    first_name: "Marcos",
                    projet: `Rencontrer Eva`,
                },
                {
                    first_name: "Rebecca",
                    projet: `Organisation d'un aller-retour Montréal / Ottawa à vélo avec camping sur le chemin`,
                },
                {
                    first_name: "Xavier & Julia",
                    projet: `Participation active à l'association Clean my Calanques https://bit.ly/3gIMLPY`,
                },
                {
                    first_name: "Étienne",
                    projet: `Réalisation et montage d'interview et de court-métrage`,
                },
                {
                    first_name: "Nicolas ",
                    projet: `Triptyque de SkateBoard peint à l’acrylique. Exploration des formes, des mouvements et des couleurs.`,
                },
                {
                    first_name: "Thomas ",
                    projet: `A recreational animation to encourage the quarantine behavior due to the covid-19 pandemic`,
                },
                {
                    first_name: "Angela",
                    projet: `Venir à Montréal en totale aventurière`,
                },
                {
                    first_name: "Hugo & Simon & Seb",
                    projet: `Création d'une ligne de vêtement conçue exclusivement en chanvre`,
                },
                {
                    first_name: "Alice",
                    projet: `Mise en place d'un projet de participation citoyenne culturel dans une salle de concert du quartier des spectacles et ses plantes`,
                },
                {
                    first_name: "Fanny",
                    projet: `Avoir eu l'audace de vivre trois ans outre-atlantique`,
                },
                {
                    first_name: "Josué",
                    projet: `avoir construit un satellite spatial`,
                },
                {
                    first_name: "Jérémy",
                    projet: `Avec les voisins qui vivent juste au dessus de chez moi, nous allons fabriqués une piscine à base de palettes récupérées et d'une bâche de plastique hermétique. Le projet prendra place dans mon backyard, faisant que le reste du voisinage ayant accès à mon terrain puissent également venir profiter de l'eau`,
                },
                {
                    first_name: "Charlotte",
                    projet: `un petit haut que j’ai cousu pour ma marque de vêtement que je suis entrain de développer`,
                },
                {
                    first_name: "Quentin",
                    projet: `reportage photo sur une après-midi Occupy The Hood en ligne sur mon site secondreveil.com`,
                },
            ].sort((a, b) => a.first_name.localeCompare(b.first_name)),
        };
    },
};
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

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
