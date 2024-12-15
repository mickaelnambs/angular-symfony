<?php

namespace App\Controller;

use App\Services\ExamService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ExamStatsController extends AbstractController
{
    public function __construct(
        private ExamService $examService
    ) {
    }

    #[Route('/exams/stats', name: 'exam_stats', methods: ['GET'])]
    public function getExamStats(): JsonResponse
    {
        return $this->json($this->examService->getExamStats());
    }
}
