<h1 align="center">
  <br>
  <a href="https://github.com/lopenling"><img src="https://raw.githubusercontent.com/lopenling/Home/main/assets/Lopenling-Logo-Icon.png" alt="Lopen Ling" width="100"></a>
  <br>
</h1>

<h3 align="center">Application Frontend</h3>

<p align="center">

  <a href="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png">
    <img width=150px src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Cc-by-nc-sa_icon.svg/1280px-Cc-by-nc-sa_icon.svg.png" alt="License">
  </a>
</p>

<p align="center">
  <a href="#floppy_disk-description">Description</a> •
  <a href="#closed_book-docs">Docs</a> •
  <a href="#grin-owner">Owner</a> •
  <a href="#speech_balloon-get-help">Get Help</a>
</p>
<hr>

## :floppy_disk: Description

Frontend of Lopen Ling. Providing management of projects, teams, glossaries etc

## :grin: Owner

[@mikkokotila](https://github.com/mikkokotila)

[@mcsneaky](https://github.com/mcsneaky)

## :closed_book: Docs

### To start up for dev:

- `npm install`
- `npm run dev`

Might want to check that variables in `.env` file fit to your need. 
They are configured to work out of box with default config

### To new prod deployment:

Render.com handles deployments automatically, there's nothing to do.
But in case want to re-setup frontend autodeploy on Render, then follow those steps:

- go to [render.com](https://dashboard.render.com/project/prj-cos1lf7sc6pc73dvehg0)
- Click on `New` and then select `Static Site`
- Select `Application-Frontend` repository
- Selet `main` branch
- Set `npm install; npm run build` as Build Command
- Set `dist` as Publish directory
- In Environment Variables section set key `VITE_API_URL` value to `https://api.lopenling.com` (or if API is deployed on different domain, set that as value)
- Under custom domains section set your desired domain
- Click `Deploy`


## :speech_balloon: Get Help

If you need any help or have suggestions for improvements, you can do that [here](issues/new).
