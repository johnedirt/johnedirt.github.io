<?php
define( "WEBMASTER_EMAIL", 'patrick@toggledev.com' );

$error = false;
$fields = array( 'name', 'subject', 'email', 'phone', 'message' );

foreach ( $fields as $field ) {
	if ( empty( $_POST[$field] ) || trim( $_POST[$field] ) == '' )
		$error = true;
}

if ( ! $error ) {
	$name = stripslashes( $_POST['name'] );
	$subject = stripslashes( $_POST['subject'] );
	$email = trim( $_POST['email'] );
	$message = stripslashes( $_POST['phone'] );
	$message = stripslashes( $_POST['message'] );

	$mail = @mail( WEBMASTER_EMAIL, $subject, $message,
		 "From: " . $name . " <" . $email . ">\r\n"
		."Reply-To: " . $email . "\r\n"
		."X-Mailer: PHP/" . phpversion() );

	if ( $mail ) {
		echo "Success";
	} else {
		echo "Error";
	}
}
?>
