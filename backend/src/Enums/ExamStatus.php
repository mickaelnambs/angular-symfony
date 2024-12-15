<?php

namespace App\Enums;

enum ExamStatus: string
{
    case Confirmed = 'Confirmé';
    case ToOrganize = 'À organiser';
    case Cancelled = 'Annulé';
    case InSearch = 'En recherche de place';
}
