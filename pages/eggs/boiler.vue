<template>
    <div class="body">
        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room livestream</span>
                    <div class="subtitle">27 mars 2020</div>
                </div>
                <div class="description">
                    Cette session live a été supprimé de facebook à cause des
                    droits d'auteur
                </div>
            </el-card>
        </el-col>

        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room Techno</span>
                    <div class="subtitle">4 mars 2020</div>
                </div>
                <div class="description">
                    Cette session n'a malheureusement pas pu être enregistrée,
                    nous en sommes désolé!
                </div>
            </el-card>
        </el-col>

        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room Live Jazz</span>
                    <div class="subtitle">19 février 2020</div>
                </div>
                <div class="description">
                    <iframe
                        width="100%"
                        height="300"
                        scrolling="no"
                        frameborder="no"
                        allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/764061727&color=%2318a2d8&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                    ></iframe>
                </div>
            </el-card>
        </el-col>

        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room Funk tribal</span>
                    <div class="subtitle">29 janvier 2020</div>
                </div>
                <div class="description">
                    Cette session n'a malheureusement pas pu être enregistrée,
                    nous en sommes désolé!
                </div>
            </el-card>
        </el-col>

        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room X Dolc’Evita</span>
                    <div class="subtitle">8 janvier 2020</div>
                </div>
                <div class="description">
                    <iframe
                        width="100%"
                        height="300"
                        allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/740572471&color=%2318a2d8&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                    ></iframe>
                </div>
            </el-card>
        </el-col>

        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room X Christmas</span>
                    <div class="subtitle">18 décembre 2019</div>
                </div>
                <div class="description">
                    Cette session contenant une prestation vinyle live de 2
                    heures n'a malheureusement pas pu être enregistré faute de
                    moyen technique. Tu souhaites apporter ton aide?
                    <a href="mailto:alexis@soundmotion.ca"
                        >Envoie moi un mail!</a
                    >
                </div>
            </el-card>
        </el-col>

        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room Rap session</span>
                    <div class="subtitle">6 novembre 2019</div>
                </div>
                <div class="description">
                    Cette session contenant une prestation rap live de 40
                    minutes n'a malheureusement pas pu être enregistré faute de
                    moyen technique. Tu souhaites apporter ton aide?
                    <a href="mailto:alexis@soundmotion.ca"
                        >Envoie moi un mail!</a
                    >
                </div>
            </el-card>
        </el-col>

        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>H2T Boiler Room X SoundCrate</span>
                    <div class="subtitle">9 octobre 2019</div>
                </div>
                <div class="description">
                    <iframe
                        title="soundcloud iframe"
                        width="100%"
                        height="300"
                        allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/695698288&color=%2318a2d8&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                    ></iframe>
                </div>
            </el-card>
        </el-col>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "H2T.boiler",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    hid: "description",
                    name: "description",
                    content:
                        "Projets musicaux récurrent du réseau communautaire H2T",
                },
                { hid: "title", property: "og:title", content: "H2T.boiler" },
                {
                    hid: "image",
                    property: "og:image",
                    content: "/images/facebook-logo-OG-boiler.png",
                },
                { property: "fb:app_id", content: "2367260910156432" },
            ],
        };
    },
    auth: false,
};
</script>

<style>
.subtitle {
    font-size: 15px;
    color: #999;
}
.body {
    text-align: center;
}

.description {
    padding: 20px;
}
</style>
