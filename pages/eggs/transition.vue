<template>
    <el-row class="layout">
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Fresque du Climat</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    Nous hébergeons des ateliers de la Fresque du Climat.
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
                    <span>Formation Les primitifs</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    Certains membres participent activement à ces formations.
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
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Documentaires</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    Nous avons référencé un bon nombre de documentaires
                    permettant d'appréhender les enjeux des changements
                    climatiques et sociétaux.
                    <br />
                    <br />
                    <a
                        href="https://docs.google.com/spreadsheets/d/1lhk0222MjeaAeHhq2EMPAKu8Xzei3IeFi7ez-DjdBXM/edit?usp=sharing"
                    >
                        <el-button type="primary" plain
                            >Accéder à la liste</el-button
                        ></a
                    >
                </div>
            </el-card>
        </el-col>
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Activités au Québec</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    Nous avons développé un site centralisant quelques activités
                    à faire au Québec, afin de faciliter ce besoin d'évasion
                    tout en évitant de prendre l'avion.
                    <br />
                    <br />
                    <a href="https://acti.quebec/">
                        <el-button type="primary" plain
                            >Accéder à Actï</el-button
                        ></a
                    >
                </div>
            </el-card>
        </el-col>
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Santropol Roulant</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    Santropol Roulant est un centre alimentaire et une
                    communauté intergénérationnelle. En faisant pousser de la
                    nourriture, en la préparant, et en la livrant aux
                    Montréalaises et Montréalais, nous créons un continuum de
                    services inspirants et engageants au bénéfice de la
                    communauté, et nous renforçons le tissu social montréalais
                    en faisant grandir la sécurité alimentaire en ville et
                    l’inclusion sociale.
                    <br />
                    <br />
                    <a href="https://santropolroulant.org/fr/">
                        <el-button type="primary" plain
                            >Accéder au site</el-button
                        ></a
                    >
                </div>
            </el-card>
        </el-col>
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Les Compagnons Maraichers·ères</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    sont des équipes organisées et motivées de volontaires de la
                    ville qui viennent prêter main-forte de façon ponctuelle sur
                    des fermes écologiques de proximité.
                    <br />
                    <br />
                    <a href="https://compagnonsmaraichers.org/">
                        <el-button type="primary" plain
                            >Accéder au site</el-button
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
