import tkinter as tk
from tkinter import ttk
import json

class ProyectosView:
    def __init__(self, root, volver_a_cliente):
        self.root = root
        self.volver_a_cliente = volver_a_cliente

        self.frame = tk.Frame(root)
        self.frame.pack(fill=tk.BOTH, expand=True)

        # Crear un lienzo (canvas) para implementar el desplazamiento vertical
        self.canvas = tk.Canvas(self.frame)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Adjuntar un widget de desplazamiento a la ventana
        self.scrollbar = ttk.Scrollbar(self.frame, orient=tk.VERTICAL, command=self.canvas.yview)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.canvas.configure(yscrollcommand=self.scrollbar.set)

        # Crear un marco para contener los proyectos
        self.inner_frame = tk.Frame(self.canvas)
        self.canvas.create_window((0, 0), window=self.inner_frame, anchor=tk.NW)

        # Establecer el evento para el redimensionamiento del lienzo
        self.inner_frame.bind("<Configure>", self.on_frame_configure)

        # Cargar proyectos desde el archivo JSON
        with open("Datos/proyectos.json", "r") as file:
            self.proyectos = json.load(file)["proyectos"]

        # Crear las cartillas de proyectos
        for proyecto in self.proyectos:
            cartilla = tk.Frame(self.inner_frame, relief=tk.RAISED, borderwidth=2)
            cartilla.pack(fill=tk.BOTH, padx=10, pady=5)

            # Mostrar información del proyecto en la cartilla
            nombre_label = tk.Label(cartilla, text=f"Nombre del proyecto: {proyecto['nombre_proyecto']}")
            nombre_label.pack(anchor=tk.W)

            postulantes_label = tk.Label(cartilla, text=f"Cantidad de postulantes: {len(proyecto['id_postulantes'])}")
            postulantes_label.pack(anchor=tk.W)

            tipo_label = tk.Label(cartilla, text=f"Tipo de proyecto: {proyecto['tipo']}")
            tipo_label.pack(anchor=tk.W)

            btn_seleccionar = ttk.Button(cartilla, text="Seleccionar proyecto",
                                          command=lambda id_proyecto=proyecto['Id_proyecto']: self.proyecto_seleccionado_callback(id_proyecto))
            btn_seleccionar.pack(side=tk.LEFT, padx=5)

            

        # Botón para volver
        self.btn_atras = ttk.Button(self.frame, text="Atrás", command=self.ir_a_cliente)
        self.btn_atras.pack(pady=10)

    def on_frame_configure(self, event):
        """Ajustar el área de desplazamiento al tamaño del marco interior."""
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))

    def mostrar(self):
        self.frame.pack(fill=tk.BOTH, expand=True)

    def ocultar(self):
        self.frame.pack_forget()

    def ir_a_cliente(self):
        self.ocultar()
        self.volver_a_cliente()  # Llama a la función de mostrar cliente

if __name__ == "__main__":
    # Prueba de ProyectosView
    root = tk.Tk()
    app = ProyectosView(root, None)
    root.mainloop()

