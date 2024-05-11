import tkinter as tk
from cliente_view import ClienteView
from consultor_view import ConsultorView
from logo import Logo

class MainApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Inicio de Sesión")

        # Establecer el tamaño fijo de la ventana
        self.root.geometry("400x300")  # Ancho x Alto

        self.logo = Logo()

        self.frame_inicio = tk.Frame(root)
        self.frame_inicio.pack(fill=tk.BOTH, expand=True)

        self.label_logo_inicio = tk.Label(self.frame_inicio, image=self.logo.image)
        self.label_logo_inicio.pack(pady=20)

        # Botón claro
        self.btn_cliente = tk.Button(self.frame_inicio, text="Iniciar como cliente", 
                                      background="#E4F1FF", foreground="#000000", command=self.ir_a_inicio_cliente)
        self.btn_cliente.pack(pady=5)

        # Botón oscuro
        self.btn_consultor = tk.Button(self.frame_inicio, text="Iniciar como consultor", 
                                        background="#3F0096", foreground="#ffffff", command=self.ir_a_inicio_consultor)
        self.btn_consultor.pack(pady=5)

        self.cliente_view = ClienteView(root, self.ir_a_inicio)  # Pasar la función de regreso a la vista principal
        self.consultor_view = ConsultorView(root)

        self.ir_a_inicio()

    def ir_a_inicio(self):
        self.frame_inicio.pack()
        if hasattr(self, 'cliente_view'):
            self.cliente_view.frame.pack_forget()
        if hasattr(self, 'consultor_view'):
            self.consultor_view.frame.pack_forget()

    def ir_a_inicio_cliente(self):
        self.frame_inicio.pack_forget()
        self.cliente_view.frame.pack()

    def ir_a_inicio_consultor(self):
        self.frame_inicio.pack_forget()
        self.consultor_view.frame.pack()

if __name__ == "__main__":
    root = tk.Tk()
    app = MainApp(root)
    root.mainloop()
