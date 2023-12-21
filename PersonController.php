<?php

namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Person;
use App\Service\Router;
use App\Service\Templating;

class PersonController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $people = Person::findAll();
        $html = $templating->render('person/index.html.php', [
            'persons' => $people,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        if ($requestPost) {
            $person = Person::fromArray($requestPost);
            // @todo missing validation
            $person->save();

            $path = $router->generatePath('person-index');
            $router->redirect($path);
            return null;
        } else {
            $person = new Person();
        }

        $html = $templating->render('person/create.html.php', [
            'person' => $person,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $personId, ?array $requestPost, Templating $templating, Router $router): ?string
    {
        $person = Person::find($personId);
        if (!$person) {
            throw new NotFoundException("Missing person with id $personId");
        }

        if ($requestPost) {
            $person->fill($requestPost);
            // @todo missing validation
            $person->save();

            $path = $router->generatePath('person-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('person/edit.html.php', [
            'person' => $person,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $personId, Templating $templating, Router $router): ?string
    {
        $person = Person::find($personId);
        if (!$person) {
            throw new NotFoundException("Missing person with id $personId");
        }

        $html = $templating->render('person/show.html.php', [
            'person' => $person,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $personId, Router $router): ?string
    {
        $person = Person::find($personId);
        if (!$person) {
            throw new NotFoundException("Missing person with id $personId");
        }

        $person->delete();
        $path = $router->generatePath('person-index');
        $router->redirect($path);
        return null;
    }
}