<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use DateTime;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response(['error' => 'Unauthenticated'], 401);
        }

        return hash_equals($user->password, $request->password) ? 'true' : 'false';

        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $currentDateTime = now()->addMinutes(30);
            $token = $user->createToken($user->username . '-authToken', ['*'], $currentDateTime);
            return response(['token' => $token], 200);
        }

        return response(['error' => 'Unauthenticated'], 401);
    }

    public function signup(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->where('username', $request->username)->first();

        if ($user) {
            return response(['error' => 'User already exists'], 401);
        }

        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        return response(['success' => 1, 'message' => 'account created'], 200);
    }
}
