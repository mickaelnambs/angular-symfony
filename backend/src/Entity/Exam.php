<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use App\Controller\ExamStatsController;
use App\Enums\ExamStatus;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/exams',
            normalizationContext: ['groups' => ['exam:read']]
        ),
        new Post(
            uriTemplate: '/exams',
            denormalizationContext: ['groups' => ['exam:write']],
            normalizationContext: ['groups' => ['exam:read']]
        ),
        new Get(
            uriTemplate: '/exams/stats',
            controller: ExamStatsController::class.'::getExamStats',
            read: false
        ),
    ]
)]
class Exam
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['exam:read', 'exam:write'])]
    #[Assert\NotBlank(message: "Le nom de l'étudiant est requis")]
    private ?string $studentName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['exam:read', 'exam:write'])]
    private ?string $location = null;

    #[ORM\Column(type: 'date')]
    #[Groups(['exam:write'])]
    #[Assert\NotNull(message: "La date de l'examen est requise")]
    #[Assert\Type("\DateTimeInterface")]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: 'time')]
    #[Groups(['exam:write'])]
    #[Assert\NotNull(message: "L'heure de l'examen est requise")]
    #[Assert\Type("\DateTimeInterface")]
    private ?\DateTimeInterface $time = null;

    #[ORM\Column(length: 50)]
    #[Groups(['exam:read', 'exam:write'])]
    #[Assert\NotBlank(message: "Le statut de l'examen est requis")]
    #[Assert\Choice(
        choices: [
            ExamStatus::ToOrganize->value,
            ExamStatus::Cancelled->value,
            ExamStatus::Confirmed->value,
            ExamStatus::InSearch->value,
        ],
        message: 'Statut invalide'
    )
    ]
    private ?string $status = null;

    #[Groups(['exam:read'])]
    #[SerializedName('formattedDate')]
    public function getFormattedDate(): string
    {
        return $this->date ? $this->date->format('d/m/Y') : '';
    }

    #[Groups(['exam:read'])]
    #[SerializedName('formattedTime')]
    public function getFormattedTime(): string
    {
        return $this->time ? $this->time->format('H:i') : '';
    }

    // Getters et Setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStudentName(): ?string
    {
        return $this->studentName;
    }

    public function setStudentName(string $studentName): self
    {
        $this->studentName = $studentName;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getTime(): ?\DateTimeInterface
    {
        return $this->time;
    }

    public function setTime(\DateTimeInterface $time): self
    {
        $this->time = $time;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
