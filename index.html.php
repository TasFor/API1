<?php

/** @var \App\Model\Person[] $persons */
/** @var \App\Service\Router $router */

$title = 'Person List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Persons List</h1>

    <a href="<?= $router->generatePath('person-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($persons as $person): ?>
            <li>
                <h3><?= $person->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('person-show', ['id' => $person->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('person-edit', ['id' => $person->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';