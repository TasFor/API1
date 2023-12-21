<?php

namespace App\Model;

use App\Service\Config;

class Person
{
    private ?int $id = null;
    private ?string $name = null;
    private ?float $weight = null;
    private ?float $height = null;
    private ?string $birthday = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Person
    {
        $this->id = $id;

        return $this;
    }

    public static function fromArray($array): Person
    {
        $person = new self();
        $person->fill($array);

        return $person;
    }

    public function fill($array): Person
    {
        if (isset($array['id']) && !$this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) {
            $this->setName($array['name']);
        }
        if (isset($array['weight'])) {
            $this->setWeight($array['weight']);
        }
        if (isset($array['height'])) {
            $this->setHeight($array['height']);
        }
        if (isset($array['birthdate'])) {
            $this->setBirthday($array['birthdate']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO('sqlite:/Users/marcin28/Documents/aplikacje_internetowe_1/lab-f-php/custom-php-framework/data.db');

        $sql = 'SELECT * FROM person';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $people = [];
        $peopleArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($peopleArray as $personArray) {
            $people[] = self::fromArray($personArray);
        }

        return $people;
    }

    public static function find($id): ?Person
    {
        $pdo = new \PDO('sqlite:/Users/marcin28/Documents/aplikacje_internetowe_1/lab-f-php/custom-php-framework/data.db');

        $sql = 'SELECT * FROM person WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $personArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (!$personArray) {
            return null;
        }
        $person = Person::fromArray($personArray);

        return $person;
    }

    public function save(): void
    {
        $pdo = new \PDO('sqlite:/Users/marcin28/Documents/aplikacje_internetowe_1/lab-f-php/custom-php-framework/data.db');

        if (!$this->getId()) {
            $sql = "INSERT INTO person (name, weight, height, birthdate) VALUES (:name, :weight, :height, :birthdate)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'weight' => $this->getWeight(),
                'height' => $this->getHeight(),
                'birthdate' => $this->getBirthday(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE person SET name = :name, weight = :weight, height = :height, birthdate = :birthdate WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':weight' => $this->getWeight(),
                ':height' => $this->getHeight(),
                ':birthdate' => $this->getBirthday(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO('sqlite:/Users/marcin28/Documents/aplikacje_internetowe_1/lab-f-php/custom-php-framework/data.db');

        $sql = "DELETE FROM person WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setName(null);
        $this->setWeight(null);
        $this->setHeight(null);
        $this->setBirthdate(null);
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Person
    {
        $this->name = $name;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(?float $weight): Person
    {
        $this->weight = $weight;

        return $this;
    }

    public function getHeight(): ?float
    {
        return $this->height;
    }

    public function setHeight(?float $height): Person
    {
        $this->height = $height;

        return $this;
    }

    public function getBirthday(): ?string
    {
        return $this->birthday;
    }

    public function setBirthday(?string $birthday): Person
    {
        $this->birthday = $birthday;

        return $this;
    }

}