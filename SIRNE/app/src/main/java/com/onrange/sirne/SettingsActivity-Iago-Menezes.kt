package com.onrange.sirne

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.MenuItem
import androidx.core.content.ContextCompat
import android.widget.ImageButton
import android.content.Intent
import android.net.Uri
import android.widget.TextView
import android.graphics.Paint

class SettingsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        supportActionBar?.hide()

        // Configura as cores da status bar e da navigation bar
        window.statusBarColor = ContextCompat.getColor(applicationContext, R.color.sirne)
        window.navigationBarColor = ContextCompat.getColor(applicationContext, R.color.black)

        // Configurar o botão de voltar
        val btnBack: ImageButton = findViewById(R.id.btnBack)
        btnBack.setOnClickListener {
            onBackPressed() // Voltar para a tela anterior
        }

        // Link do instagram (Onrange)
        val onrangeTextView = findViewById<TextView>(R.id.onrange)
        onrangeTextView.paintFlags = onrangeTextView.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        onrangeTextView.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/onrangedev/"))
            it.context.startActivity(intent)
        }

        // Link do instagram (Davi Barbosa)
        val daviTextView = findViewById<TextView>(R.id.davi)
        daviTextView.paintFlags = daviTextView.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        daviTextView.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/davi_barbosa3009/"))
            it.context.startActivity(intent)
        }

        // Link do instagram (Érick da Silva)
        val erickTextView = findViewById<TextView>(R.id.erick)
        erickTextView.paintFlags = erickTextView.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        erickTextView.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/eierickdasilva/"))
            it.context.startActivity(intent)
        }

        // Link do instagram (Gustavo Lima)
        val gustavoTextView = findViewById<TextView>(R.id.gustavo)
        gustavoTextView.paintFlags = gustavoTextView.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        gustavoTextView.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/gustavolima_sem_o_t/"))
            it.context.startActivity(intent)
        }

        // Link do instagram (Iago Menezes)
        val iagoTextView = findViewById<TextView>(R.id.iago)
        iagoTextView.paintFlags = iagoTextView.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        iagoTextView.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/iagomenezes37/"))
            it.context.startActivity(intent)
        }

        // Link do instagram (Kiam Mota)
        val kiamTextView = findViewById<TextView>(R.id.kiam)
        kiamTextView.paintFlags = kiamTextView.paintFlags or Paint.UNDERLINE_TEXT_FLAG
        kiamTextView.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.instagram.com/kiammota/"))
            it.context.startActivity(intent)
        }

    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            android.R.id.home -> {
                onBackPressed() // Retorna à tela anterior ao clicar no ícone de voltar
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}
