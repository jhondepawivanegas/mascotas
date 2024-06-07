import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-custom-image bg-cover bg-center md:w-1/4 w-full h-screen flex justify-center items-end">
        <form className="w-full flex flex-col gap-2 p-2 text-center"> {/* Añadida la clase text-center */}
          <input className="bg-[#ffffff8d] rounded-[30px] p-3" type="text" placeholder="Correo electrónico" />
          <input className="bg-[#ffffff8d] rounded-[30px] p-3" type="text" placeholder="Contraseña" />
          <Link href="/pets">
            <button className="bg-[#3d46e9] p-3 rounded-[30px] text-white text-xl">
              Ingresar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
