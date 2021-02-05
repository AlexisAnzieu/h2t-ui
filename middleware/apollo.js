import { onError } from "apollo-link-error";

export default function (ctx) {
    const link = onError(({ graphQLErrors, networkError }) => {
        console.log(graphQLErrors);
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                if (message === "Context creation failed: jwt token expired") {
                    console.log(ctx);
                    ctx.$apolloHelpers.onLogout();
                    ctx.$auth.logout();
                }
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                );
            });
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    return {
        link,
        httpEndpoint: process.env.API_ENDPOINT,
        httpLinkOptions: {
            credentials: "same-origin",
        },
    };
}
