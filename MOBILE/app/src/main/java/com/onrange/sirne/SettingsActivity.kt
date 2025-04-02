package com.onrange.sirne

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.MenuItem
import androidx.core.content.ContextCompat
import android.widget.ImageButton

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
