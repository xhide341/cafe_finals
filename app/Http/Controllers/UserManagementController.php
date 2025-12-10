<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index()
    {
        // NOTE: This uses fake/demo data for local demonstration only
        // In production, this would query actual user data from the database
        return Inertia::render('users');
    }
}
