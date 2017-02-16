<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Girl;

class SearchGirlsController extends Controller
{
    public function searchGirls(Request $request)
    {
    	$lat = $request->lat;
    	$lng = $request->lng;

    	$girls = Girl::whereBetween('lat', [$lat-0.1, $lat+0.1])
    					->whereBetween('lng', [$lng-0.1, $lng+0.1])
    					->get();
    	return $girls;
    }
}