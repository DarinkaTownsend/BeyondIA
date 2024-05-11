import tkinter as tk
from tkinter import ttk
from proyectos_view import ProyectosView
from logo import Logo

class ClienteView:
    def __init__(self, root, volver_a_main):
        self.root = root
        self.volver_a_main = volver_a_main

        self.frame = tk.Frame(root)

        self.logo = Logo()
        self.label_logo = tk.Label(self.frame, image=self.logo.image)
        self.label_logo.pack(pady=10)

        self.frame_botones = tk.Frame(self.frame)
        self.frame_botones.pack()

        # Botón para ver proyectos
        self.btn_ver_proyectos = ttk.Button(self.frame_botones, text="Ver proyectos", command=self.ir_a_proyectos)
        self.btn_ver_proyectos.pack(side=tk.LEFT, padx=5)

        # Botón de regreso
        self.btn_atras = ttk.Button(self.frame_botones, text="Atrás", command=self.volver_a_main)
        self.btn_atras.pack(side=tk.LEFT, padx=5)

        self.frame_busqueda = tk.Frame(self.frame)
        self.frame_busqueda.pack(pady=10)

        self.label_busqueda = tk.Label(self.frame_busqueda, text="Buscar:")
        self.label_busqueda.pack(side=tk.LEFT)

        self.entry_busqueda = tk.Entry(self.frame_busqueda)
        self.entry_busqueda.pack(side=tk.LEFT, padx=5)

        self.btn_guardar_busqueda = tk.Button(self.frame_busqueda, text="Guardar búsqueda", command=self.guardar_busqueda)
        self.btn_guardar_busqueda.pack(side=tk.LEFT)

        self.frame.pack(fill=tk.BOTH, expand=True)
        self.proyectos_view = ProyectosView(root, self.ir_a_cliente)
        self.ir_a_cliente()
    
    def ir_a_cliente(self):
        self.frame.pack()
        if hasattr(self, 'proyectos_view'):
            self.proyectos_view.frame.pack_forget()
        

    def guardar_busqueda(self):
        prompt = self.entry_busqueda.get()
        print("Búsqueda guardada:", prompt)

    def ir_a_proyectos(self):
        self.frame.pack_forget()  # Oculta la vista ClienteView
        self.proyectos_view.frame.pack()  # Muestra la vista ProyectosView


    def ocultar(self):
        self.frame.pack_forget()

    def seleccionar_proyecto(self, id_proyecto):
        self.proyectos_view.ocultar()
        # ... Otro código

    def terminar_proyecto(self, id_proyecto):
        self.proyectos_view.ocultar()

if __name__ == "__main__":
    root = tk.Tk()
    app = ClienteView(root, None)
    root.mainloop()
