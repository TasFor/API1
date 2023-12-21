<?php

/** @var \App\Model\Person $person */
/** @var \App\Service\Router $router */

$title = "{$person->getName()} ({$person->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $person->getName() ?></h1>
    <article>
        <!-- Dodaj odpowiednie wyświetlanie informacji o osobie -->
        Name: <?= $person->getName() ?><br>
        Height: <?= $person->getHeight() ?><br>
        Weight: <?= $person->getWeight() ?><br>
        Birthdate: <?= $person->getBirthday() ?><br>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('person-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('person-edit', ['id' => $person->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';