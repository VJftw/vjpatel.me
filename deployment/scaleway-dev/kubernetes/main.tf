provider "scaleway" {
  zone   = "fr-par-1"
  region = "fr-par"
}

# resource "scaleway_instance_volume" "data" {
#   size_in_gb = 100
#   type = "b_ssd"
# }

data "scaleway_instance_image" "my_image" {
  name         = "kubernetes"
  latest       = true
  architecture = "x86_64"
}

resource "scaleway_instance_ip" "public_ip" {}

resource "scaleway_instance_server" "dev" {
  type  = "DEV1-M"
  image = element(split("/", data.scaleway_instance_image.my_image.id), 1)

  security_group_id = scaleway_instance_security_group.dev.id

  ip_id = scaleway_instance_ip.public_ip.id

  # root_volume {
  #   size_in_gb = 40
  #   delete_on_termination = false
  # }


  # additional_volume_ids = [ scaleway_instance_volume.data.id ]
}

resource "scaleway_instance_security_group" "dev" {
  inbound_default_policy  = "drop"
  outbound_default_policy = "accept"

  inbound_rule {
    action   = "accept"
    port     = "22"
    ip_range = "0.0.0.0/0"
  }

  # Hashicorp Vault
  inbound_rule {
    action   = "accept"
    port     = "8200"
    ip_range = "0.0.0.0/0"
  }

  # Kubernetes
  inbound_rule {
    action   = "accept"
    port     = "6443"
    ip_range = "0.0.0.0/0"
  }

  # HTTPS Ingress
  inbound_rule {
    action   = "accept"
    port     = "443"
    ip_range = "0.0.0.0/0"
  }

  # HTTP Ingress
  inbound_rule {
    action   = "accept"
    port     = "80"
    ip_range = "0.0.0.0/0"
  }
}
