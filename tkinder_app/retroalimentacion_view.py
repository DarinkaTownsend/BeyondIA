import tkinter as tk

class RetroalimentacionView:
    def __init__(self, root, volver_callback):
        self.root = root
        self.volver_callback = volver_callback

        self.frame = tk.Frame(root)
        self.frame.pack(fill=tk.BOTH, expand=True)

        label = tk.Label(self.frame, text="¡Proyecto terminado! Retroalimentación:")
        label.pack()

        self.btn_atras = ttk.Button(self.frame, text="Atrás", command=self.volver_callback)
        self.btn_atras.pack(pady=10)

    def mostrar(self):
        self.frame.pack(fill=tk.BOTH, expand=True)

    def ocultar(self):
        self.frame.pack_forget()
