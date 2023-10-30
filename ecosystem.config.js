module.exports = {
    apps: [
        {
            name: "my-server",
            script: "./index.js",
            watch: true,
            env: {
                NODE_ENV: "development",
            },
        },
    ],
    deploy: {
        staging: {
            user: "ubuntu",
            key: "~/skills/ssh/epicure-front-gilad.pem",
            host: ["ec2-16-170-148-201.eu-north-1.compute.amazonaws.com"],
            ref: "origin/main",
            repo: "git@github.com:giladmoveo10/epicure-back.git",
            path: "/home/ubuntu/my-server",
        },
    },
};
