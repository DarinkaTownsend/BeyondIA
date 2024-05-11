import tkinter as tk

class Logo:
    def __init__(self):
        self.image = tk.PhotoImage(file="recursos/beyond/6.png").subsample(10)  # Reducir el tamaño a la mitad

if __name__ == "__main__":
    root = tk.Tk()
    app = Logo()
    root.mainloop()

