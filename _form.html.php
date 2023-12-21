<?php
/** @var $person ?\App\Model\Person */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="person[name]" value="<?= $person ? $person->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="height">Height</label>
    <input type="text" id="height" name="person[height]" value="<?= $person ? $person->getHeight() : '' ?>">
</div>

<div class="form-group">
    <label for="weight">Weight</label>
    <input type="text" id="weight" name="person[weight]" value="<?= $person ? $person->getWeight() : '' ?>">
</div>

<div class="form-group">
    <label for="birthdate">Birthdate</label>
    <input type="text" id="birthdate" name="person[birthdate]" value="<?= $person ? $person->getBirthday() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>