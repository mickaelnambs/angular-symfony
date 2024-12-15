<?php

namespace App\DataFixtures;

use App\Entity\Exam;
use App\Enums\ExamStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $statusList = [
            ExamStatus::ToOrganize->value,
            ExamStatus::Cancelled->value,
            ExamStatus::Confirmed->value,
            ExamStatus::InSearch->value,
        ];

        for ($i = 0; $i < 20; ++$i) {
            $exam = new Exam();
            $examDate = $faker->dateTimeBetween('now', '+3 months');
            $examTime = $faker->dateTimeBetween('08:00', '18:00');

            $exam->setStudentName($faker->name)
                ->setLocation($faker->randomElement([
                    'Salle A101',
                    'Salle B202',
                    'Salle C303',
                    'Amphithéâtre Principal',
                    'Laboratoire 1',
                    null,
                ]))
                ->setDate($examDate)
                ->setTime($examTime)
                ->setStatus($faker->randomElement($statusList));

            $manager->persist($exam);
        }

        $manager->flush();
    }
}
