<?php

namespace App\Services;

use App\Enums\ExamStatus;
use App\Repository\ExamRepository;

class ExamService
{
    public function __construct(
        private ExamRepository $examRepository
    ) {
    }

    public function getExamStats(): array
    {
        return [
            'confirmed' => $this->examRepository->count(['status' => ExamStatus::Confirmed->value]),
            'toOrganize' => $this->examRepository->count(['status' => ExamStatus::ToOrganize->value]),
            'cancelled' => $this->examRepository->count(['status' => ExamStatus::Cancelled->value]),
            'inSearch' => $this->examRepository->count(['status' => ExamStatus::InSearch->value]),
        ];
    }
}
