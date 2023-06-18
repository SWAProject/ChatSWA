## ChatSWA

Aplikacja ChatSWA umożliwia użytkownikom komunikację poprzez wysyłanie wiadomości do siebie nawzajem. Aplikacja została zbudowana przy użyciu następujących technologii:

Svelte: Framework JavaScript do tworzenia interfejsów użytkownika. Svelte został wykorzystany do budowy komponentów interfejsu użytkownika, takich jak page.svelte, Login.svelte i Messages.svelte.

PocketBase: Biblioteka JavaScript do integracji z bazą danych w chmurze. PocketBase został użyty do obsługi autoryzacji użytkowników, przechowywania wiadomości i zarządzania kolekcjami.

Komponenty
page.svelte
Komponent page.svelte jest odpowiedzialny za renderowanie głównej strony aplikacji. Wyświetla avatar użytkownika, który wysyła wiadomość, oraz zawartość komponentu Login.svelte lub Messages.svelte, w zależności od stanu uwierzytelnienia użytkownika.

Login.svelte
Komponent Login.svelte obsługuje logowanie i rejestrację użytkownika. Zawiera formularz, w którym użytkownik może wprowadzić nazwę użytkownika i hasło. Komponent korzysta z biblioteki PocketBase do uwierzytelniania użytkowników i przechowywania danych.

Messages.svelte
Komponent Messages.svelte jest odpowiedzialny za wyświetlanie i wysyłanie wiadomości. Wyświetla listę wiadomości wraz z informacjami o użytkownikach, którzy je wysłali. Komponent używa biblioteki PocketBase do pobierania i dodawania wiadomości, a także do subskrypcji w czasie rzeczywistym, co pozwala na wyświetlanie nowych wiadomości bez konieczności odświeżania strony.

Style
Aplikacja korzysta z różnych stylów CSS, które zostały zdefiniowane wewnątrz komponentów. Style te są odpowiedzialne za wygląd i układ elementów interfejsu użytkownika, takich jak przyciski, pola tekstowe i listy wiadomości.

Zależności
Aplikacja używa następujących zależności:

Svelte: wersja x.x.x
PocketBase: wersja x.x.x
Aby uruchomić aplikację, należy zainstalować wymienione powyżej zależności i skonfigurować środowisko zgodnie z dokumentacją tych bibliotek.
