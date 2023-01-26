<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Webster</title>

    <!-- Favicon -->
    <link rel="icon" href="/assets/logo.png" type="image/x-icon">

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Vite -->
    @viteReactRefresh
    @vite('resources/js/app.js')

</head>

<body class="antialiased">
    <div id="root"></div>
</body>

</html>
