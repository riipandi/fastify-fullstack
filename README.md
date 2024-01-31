# Fastify Drizzle Playground

This project was bootstrapped with Fastify-CLI.

## Quick Start

In the project directory, you can run:

```sh
pnpm dev      # Start the app in dev mode
pnpm start    # Run in the production mode
pnpm test     # Run the test cases.
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Routes Folder

Routes define endpoints within your application. Fastify provides an
easy path to a microservice architecture, in the future you might want
to independently deploy some of those.

In this folder you should define all the routes that define the endpoints
of your web application. Each service is a [Fastify plugin](https://www.fastify.io/docs/latest/Reference/Plugins/), it is
encapsulated (it can have its own independent plugins) and it is
typically stored in a file; be careful to group your routes logically,
e.g. all `/users` routes in a `users.js` file. We have added
a `root.js` file for you with a '/' root added.

If a single file become too large, create a folder and add a `index.js` file there:
this file must be a Fastify plugin, and it will be loaded automatically
by the application. You can now add as many files as you want inside that folder.
In this way you can create complex routes within a single monolith,
and eventually extract them.

If you need to share functionality between routes, place that
functionality into the `plugins` folder, and share it via
[decorators](https://www.fastify.io/docs/latest/Reference/Decorators/).

## Plugins Folder

Plugins define behavior that is common to all the routes in your
application. Authentication, caching, templates, and all the other cross
cutting concerns should be handled by plugins placed in this folder.

Files in this folder are typically defined through the
[`fastify-plugin`](https://github.com/fastify/fastify-plugin) module,
making them non-encapsulated. They can define decorators and set hooks
that will then be used in the rest of your application.

Check out:

- [The hitchhiker's guide to plugins](https://www.fastify.io/docs/latest/Guides/Plugins-Guide/)
- [Fastify decorators](https://www.fastify.io/docs/latest/Reference/Decorators/).
- [Fastify lifecycle](https://www.fastify.io/docs/latest/Reference/Lifecycle/).

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
