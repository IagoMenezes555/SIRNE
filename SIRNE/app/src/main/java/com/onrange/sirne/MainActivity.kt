package com.onrange.sirne

import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.core.content.ContextCompat
import okhttp3.OkHttpClient
import okhttp3.Request
import com.google.gson.Gson
import androidx.appcompat.app.AlertDialog
import com.google.android.material.floatingactionbutton.FloatingActionButton

class MainActivity : AppCompatActivity() {

    //Data classes para o JSON retornado pela Google Sheets API
    data class PlanilhaResponse(val table: Table)
    data class Table(val rows: List<Row>)
    data class Row(val c: List<Cell?>)
    data class Cell(val v: String?)

    //Função para buscar os dados da planilha
    fun buscarDadosDaPlanilha(): List<List<String>> {
        val url = "https://docs.google.com/spreadsheets/d/1Brk8Z4gVhExire8tRf-4AsAK1C_Oj22Vds6u3HPzdQc/gviz/tq?tqx=out:json"

        val client = OkHttpClient()
        val request = Request.Builder().url(url).build()
        val response = client.newCall(request).execute()
        val json = response.body?.string()

        val jsonCorrigido = json?.substringAfter("(")?.substringBeforeLast(")")
        val gson = Gson()
        val dados = gson.fromJson(jsonCorrigido, PlanilhaResponse::class.java)

        return dados.table.rows.map { row ->
            row.c.map { cell -> cell?.v ?: "" }
        }
    }

    // Função para buscar os dados em background e atualizar a UI
    fun fetchSheetData(merendaViews: Map<String, TextView>, almocoViews: Map<String, TextView>) {
        Thread {
            try {
                val dados = buscarDadosDaPlanilha()
                runOnUiThread {
                    for (row in dados) {
                        if (row.size >= 5) {
                            val dia = row[0].toUpperCase()
                            val merenda = row[1]
                            val almoco = row[2]
                            val caloriasMerenda = row[7]
                            val lactoseMerenda = row[11]
                            val caloriasAlmoco = row[10]
                            val lactoseAlmoco = row[12]

                            // Atualiza os TextViews com as informações de merenda e almoço
                            merendaViews[dia]?.text = merenda
                            almocoViews[dia]?.text = almoco

                            // Configura o clique nos cards para abrir a janela de nutrição
                            val cardView = when (dia) {
                                "SEGUNDA" -> findViewById<CardView>(R.id.cardViewSegunda)
                                "TERÇA" -> findViewById<CardView>(R.id.cardViewTerca)
                                "QUARTA" -> findViewById<CardView>(R.id.cardViewQuarta)
                                "QUINTA" -> findViewById<CardView>(R.id.cardViewQuinta)
                                "SEXTA" -> findViewById<CardView>(R.id.cardViewSexta)
                                else -> null
                            }
                            cardView?.setOnClickListener {
                                showNutritionDialog(dia, merenda, caloriasMerenda, lactoseMerenda, almoco, caloriasAlmoco, lactoseAlmoco)
                            }
                        }
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
                runOnUiThread {
                    Toast.makeText(this, "Erro ao buscar dados da planilha", Toast.LENGTH_SHORT).show()
                }
            }
        }.start()
    }

    // Função para mostrar a janela de nutrição (AlertDialog)
    private fun showNutritionDialog(dia: String, merenda: String, caloriasMerenda: String, lactoseMerenda: String, almoco: String, caloriasAlmoco: String, lactoseAlmoco: String) {
        val nutritionMessage = """
            MERENDA
            
            CALORIAS: $caloriasMerenda
            LACTOSE: $lactoseMerenda

            ALMOÇO
            
            CALORIAS: $caloriasAlmoco
            LACTOSE: $lactoseAlmoco
        """.trimIndent()

        val builder = AlertDialog.Builder(this)
        builder.setTitle("NUTRIÇÃO")
        builder.setMessage(nutritionMessage)
        builder.setPositiveButton("Fechar") { dialog, _ -> dialog.dismiss() }
        builder.show()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Oculta a ActionBar
        supportActionBar?.hide()

        // Configura as cores da status bar e da navigation bar
        window.statusBarColor = ContextCompat.getColor(applicationContext, R.color.sirne)
        window.navigationBarColor = ContextCompat.getColor(applicationContext, R.color.black)

        // Configura o BottomNavigationView
        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.bottomNavigationView)
        bottomNavigationView.selectedItemId = R.id.nav_cardapio

        bottomNavigationView.setOnItemSelectedListener { item: MenuItem ->
            var intent: Intent? = null
            when (item.itemId) {
                R.id.nav_tarefas -> intent = Intent(this, TarefasActivity::class.java)
                R.id.nav_notas -> intent = Intent(this, NotasActivity::class.java)
                R.id.nav_cardapio -> return@setOnItemSelectedListener true
            }
            if (intent != null) {
                startActivity(intent)
                overridePendingTransition(0, 0)
                finish()
            }
            true
        }

        // Referências aos TextViews para cada dia
        val dayNameSegunda = findViewById<TextView>(R.id.day_name_segunda)
        val merendaTitleSegunda = findViewById<TextView>(R.id.merenda_title_segunda)
        val merendaNameSegunda = findViewById<TextView>(R.id.merenda_name_segunda)
        val almocoTitleSegunda = findViewById<TextView>(R.id.almoço_title_segunda)
        val almocoNameSegunda = findViewById<TextView>(R.id.almoço_name_segunda)

        val dayNameTerca = findViewById<TextView>(R.id.day_name_terca)
        val merendaTitleTerca = findViewById<TextView>(R.id.merenda_title_terca)
        val merendaNameTerca = findViewById<TextView>(R.id.merenda_name_terca)
        val almocoTitleTerca = findViewById<TextView>(R.id.almoço_title_terca)
        val almocoNameTerca = findViewById<TextView>(R.id.almoço_name_terca)

        val dayNameQuarta = findViewById<TextView>(R.id.day_name_quarta)
        val merendaTitleQuarta = findViewById<TextView>(R.id.merenda_title_quarta)
        val merendaNameQuarta = findViewById<TextView>(R.id.merenda_name_quarta)
        val almocoTitleQuarta = findViewById<TextView>(R.id.almoço_title_quarta)
        val almocoNameQuarta = findViewById<TextView>(R.id.almoço_name_quarta)

        val dayNameQuinta = findViewById<TextView>(R.id.day_name_quinta)
        val merendaTitleQuinta = findViewById<TextView>(R.id.merenda_title_quinta)
        val merendaNameQuinta = findViewById<TextView>(R.id.merenda_name_quinta)
        val almocoTitleQuinta = findViewById<TextView>(R.id.almoço_title_quinta)
        val almocoNameQuinta = findViewById<TextView>(R.id.almoço_name_quinta)

        val dayNameSexta = findViewById<TextView>(R.id.day_name_sexta)
        val merendaTitleSexta = findViewById<TextView>(R.id.merenda_title_sexta)
        val merendaNameSexta = findViewById<TextView>(R.id.merenda_name_sexta)
        val almocoTitleSexta = findViewById<TextView>(R.id.almoço_title_sexta)
        val almocoNameSexta = findViewById<TextView>(R.id.almoço_name_sexta)

// Mapeia os TextViews para merenda e almoço de cada dia
        val merendaViews = mapOf(
            "SEGUNDA" to merendaNameSegunda,
            "TERÇA" to merendaNameTerca,
            "QUARTA" to merendaNameQuarta,
            "QUINTA" to merendaNameQuinta,
            "SEXTA" to merendaNameSexta
        )
        val almocoViews = mapOf(
            "SEGUNDA" to almocoNameSegunda,
            "TERÇA" to almocoNameTerca,
            "QUARTA" to almocoNameQuarta,
            "QUINTA" to almocoNameQuinta,
            "SEXTA" to almocoNameSexta
        )
        // Botão de configurações
        val configButton: FloatingActionButton = findViewById(R.id.nav_config)
        configButton.setOnClickListener {
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
        }

        // Busca os dados da planilha e atualiza os TextViews de merenda e almoço
        fetchSheetData(merendaViews, almocoViews)
    }
}
