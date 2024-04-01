const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="p-2 bg-neutral-200">
            <div>
                <p className="text-center">Created by &copy;{currentYear} <a href="https://github.com/hojinchang">Hojin Chang</a></p>
            </div>
        </footer>
    )
}

export default Footer;