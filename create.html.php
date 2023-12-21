<?php

/** @var \App\Model\Person $person */
/** @var \App\Service\Router $router */

$title = 'Create Person';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Person</h1>
    <form action="<?= $router->generatePath('person-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="person-create">
    </form>

    <a href="<?= $router->generatePath('person-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';ARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';