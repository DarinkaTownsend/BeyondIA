import tkinter as tk
from tkinter import ttk
from logo import Logo

class ConsultorView:
    def __init__(self, root):
        self.frame = tk.Frame(root)

        self.logo = Logo()

        self.label_logo_consultor = tk.Label(self.frame, image=self.logo.image)
        self.label_logo_consultor.pack(pady=20)

        self.label_inicio_consultor = tk.Label(self.frame, text="Inicio de sesión como consultor")
        self.label_inicio_consultor.pack(pady=5)

        self.btn_atras_consultor = ttk.Button(self.frame, text="Atrás", command=self.ir_a_inicio)
        self.btn_atras_consultor.pack(pady=5)

    def ir_a_inicio(self):
        self.frame.pack_forget()

if __name__ == "__main__":
    root = tk.Tk()
    app = ConsultorView(root)
    root.mainloop()
