<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $messagesData = [
            [
                'name' => 'Mario',
                'surname' => 'Rossi',
                'email' => 'mario.rossi@example.com',
                'text' => 'Buongiorno, vorrei avere maggiori informazioni sull\'appartamento.'
            ],
            [
                'name' => 'Giulia',
                'surname' => 'Bianchi',
                'email' => 'giulia.bianchi@example.com',
                'text' => 'Salve, è ancora disponibile l\'appartamento?'
            ],
            [
                'name' => 'Luca',
                'surname' => 'Verdi',
                'email' => 'luca.verdi@example.com',
                'text' => 'Sono interessato all\'affitto. Quando sarebbe possibile visitare l\'appartamento?'
            ],
            [
                'name' => 'Alessandro',
                'surname' => 'Neri',
                'email' => 'alessandro.neri@example.com',
                'text' => 'Vorrei prenotare una visita per vedere l\'appartamento. È possibile sabato mattina?'
            ],
            [
                'name' => 'Francesca',
                'surname' => 'Gialli',
                'email' => 'francesca.gialli@example.com',
                'text' => 'Buonasera, mi piacerebbe sapere di più sui costi mensili.'
            ],
            [
                'name' => 'Marco',
                'surname' => 'Blu',
                'email' => 'marco.blu@example.com',
                'text' => 'Ciao, sono interessato all\'appartamento. Potrei avere una visita martedì pomeriggio?'
            ],
            [
                'name' => 'Elisa',
                'surname' => 'Viola',
                'email' => 'elisa.viola@example.com',
                'text' => 'Buongiorno, l\'appartamento è arredato?'
            ],
            [
                'name' => 'Davide',
                'surname' => 'Grigio',
                'email' => 'davide.grigio@example.com',
                'text' => 'Salve, vorrei sapere se il prezzo è trattabile.'
            ],
            [
                'name' => 'Sara',
                'surname' => 'Rosa',
                'email' => 'sara.rosa@example.com',
                'text' => 'Buongiorno, l\'appartamento è ancora disponibile?'
            ],
            [
                'name' => 'Stefano',
                'surname' => 'Azzurri',
                'email' => 'stefano.azzurri@example.com',
                'text' => 'Ciao, posso visitare l\'appartamento sabato pomeriggio?'
            ],
            [
                'name' => 'Chiara',
                'surname' => 'Beige',
                'email' => 'chiara.beige@example.com',
                'text' => 'Buonasera, è disponibile per una visita domani mattina?'
            ],
            [
                'name' => 'Federico',
                'surname' => 'Marrone',
                'email' => 'federico.marrone@example.com',
                'text' => 'Salve, posso avere maggiori dettagli sulla cauzione?'
            ]
        ];

        foreach ($messagesData as $message) {
            $new_message = new Message();
            $new_message->name = $message['name'];
            $new_message->surname = $message['surname'];
            $new_message->email = $message['email'];
            $new_message->message = $message['text'];
            $new_message->save();
        }




    }
}
