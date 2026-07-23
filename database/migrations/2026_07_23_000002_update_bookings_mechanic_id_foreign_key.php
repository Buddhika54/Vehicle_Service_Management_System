<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Null out existing mechanic_id values — old values point to users.id,
        // not mechanics.id, so there's nothing safe to preserve.
        DB::table('bookings')->update(['mechanic_id' => null]);

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['mechanic_id']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->foreign('mechanic_id')->references('id')->on('mechanics')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['mechanic_id']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->foreign('mechanic_id')->references('id')->on('users')->nullOnDelete();
        });
    }
};