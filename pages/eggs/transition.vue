<template>
    <el-row class="layout">
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Fresque du Climat</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    H2T héberge des ateliers de la Fresque du Climat.
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        :href="`mailto:contact@h2t.club?subject=Je souhaite participer à la Fresque du Climat`"
                        >Contactez-nous</a
                    >
                    si vous êtes interessés! <br /><br />
                    Depuis fin 2018, l’association la Fresque du Climat œuvre
                    pour embarquer tous les individus et toutes les
                    organisations dans la transition, en permettant la diffusion
                    rapide d’une compréhension partagée du défi que représente
                    le changement climatique. Ils réalisent cette mission
                    d’éducation et de sensibilisation auprès de tous les
                    publics, en France et dans plus de 40 pays. L’efficacité de
                    cet outil pédagogique et sa licence d’utilisation ont
                    facilité sa diffusion exponentielle, avec un doublement du
                    nombre de personnes sensibilisées tous les 5 mois.
                    <br />
                    <br />
                    <a href="https://fresqueduclimat.org/">
                        <el-button type="primary" plain
                            >En savoir plus</el-button
                        ></a
                    >
                </div>
            </el-card>
        </el-col>
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Les primitifs</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    Certains membres H2T participent activement à ces
                    formations.
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        :href="`mailto:contact@h2t.club?subject=Je souhaite participer à la Fresque du Climat`"
                        >Contactez-nous</a
                    >
                    si vous êtes interessés! <br /><br />
                    Depuis 2007, l’expérience des Primitifs va au-delà du cours
                    de survie. Leur vision de la nature n’est pas naïve ou
                    romantique, elle enseigne simplement comment vivre comme le
                    faisaient nos ancêtres. La philosophie des Primitifs est de
                    remplacer la peur et les mythes par des connaissances, des
                    traditions, une conscience nouvelle et une curiosité
                    contagieuse. En ce qui concerne les formations régulières,
                    les tarifs sont maintenus au plus bas puisque l' objectif
                    est la diffusion : le savoir appartient à l’enfant de la
                    terre qui sommeille en chacun de nous.

                    <br />
                    <br />
                    <a href="https://www.lesprimitifs.ca/nos-formations">
                        <el-button type="primary" plain
                            >En savoir plus</el-button
                        ></a
                    >
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    auth: false,
};
</script>

<style>
.description {
    padding-top: 20px;
    font-size: 20px;
}

.layout {
    padding-left: 40px;
    text-align: center;
}

@media screen and (max-width: 600px) {
    .layout {
        padding-left: 20px;
    }
}
</style>
