<template>
  <!--<div class="about">
    <h1>This is an about page</h1>
  </div>-->
  <html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <header>
            Here goes logo, navigation, etc.
             <widget-container-modal />
        </header>
        <main>
          <p>
          <va-modal v-model="showModal" :message="message" title="Overview" />
        </p>
        </main>
        <footer>
            Footer information, links, etc.
        </footer>
    </body>
</html>
</template>
