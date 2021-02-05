import cookie from "cookie";

export default function ({ $auth, req }) {
    $auth.onRedirect((to, from) => {
        if (req && req.headers.cookie && process.server) {
            try {
                const parsedCookies = cookie.parse(req.headers.cookie);
                const user = JSON.parse(parsedCookies.vuex).auth.user;
                if (user) {
                    $auth.setUser(user);
                    return from;
                }
            } catch (error) {
                return to;
            }
        }
    });
}
