<template>
    <el-row class="layout">
        <el-col :xs="23" :sm="23" :md="12" style="padding: 10px">
            <el-card>
                <div slot="header">
                    <span>Bonnes pratiques de finances personnelles</span>
                </div>
                <div style="padding: 20px; text-align: left">
                    Démystifier le monde de l'investissement afin d'atteindre
                    l'indépendance financière en quelques étapes:
                    <br />
                    <br />
                    <ul>
                        <li>REER et CELI, c’est quoi?</li>
                        <li>RAP et achat immobilier</li>
                        <li>principe de base d’investissements</li>
                        <li>atteindre l’indépendance financière</li>
                        <li>fiscalité</li>
                        <li>retour en France</li>
                    </ul>
                    <br />
                    <a href="/assets/Investissement.pdf">
                        <el-button type="primary" plain
                            >Accéder à la présentation</el-button
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
