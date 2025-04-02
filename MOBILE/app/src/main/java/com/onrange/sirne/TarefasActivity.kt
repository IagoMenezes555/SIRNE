package com.onrange.sirne

import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.google.android.material.bottomnavigation.BottomNavigationView

internal class TarefasActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tarefas)

        supportActionBar?.hide()

        // Configura as cores da status bar e da navigation bar
        window.statusBarColor = ContextCompat.getColor(applicationContext, R.color.sirne)
        window.navigationBarColor = ContextCompat.getColor(applicationContext, R.color.black)

        // Configurar BottomNavigationView
        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.bottomNavigationView)
        bottomNavigationView.selectedItemId = R.id.nav_tarefas

        bottomNavigationView.setOnItemSelectedListener { item: MenuItem ->
            var intent: Intent? = null
            when (item.itemId) {
                R.id.nav_cardapio -> intent = Intent(
                    this,
                    MainActivity::class.java
                )

                R.id.nav_notas -> intent =
                    Intent(this, NotasActivity::class.java)
            }
            if (intent != null) {
                startActivity(intent)
                overridePendingTransition(0, 0) // Remove animação
                finish()
            }
            true
        }
    }
}