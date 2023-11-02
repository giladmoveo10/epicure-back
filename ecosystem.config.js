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
            key: "/home/ubuntu/.ssh/id_rsa",
            host: ["ec2-63-35-217-134.eu-west-1.compute.amazonaws.com"],
            ref: "origin/main",
            repo: "git@github.com:giladmoveo10/epicure-back.git",
            path: "/home/ubuntu/epicure/my-server",
        },
    },
};
